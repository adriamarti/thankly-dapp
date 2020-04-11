pragma solidity ^ 0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";

/**
 * @title ThanklyToken
 * @dev This is the Token Smart Contract that will be used to create
 *      tokens for the different companies
 */

contract ThanklyToken is Initializable, Ownable {

  //-------------------------------- //
  // STORAGE
  //-------------------------------- //

  // The percentage that the contract charges to the company for mining tokens
  uint256 public sellingPercentage;

  // The value of the token
  uint256 public tokenValueConversion;

  struct Token {
    string name;
    string symbol;
    bool active;
    bool registered;
    mapping (bytes32 => uint256) transferableTokens;
    mapping (bytes32 => uint256) burnableTokens;
  }

  mapping (address => Token) public companyToken;
  mapping (bytes32 => address) public workerCompanyAddress;
  mapping (address => bool) private trustedSigner;

  //-------------------------------- //
  // EVENTS
  //-------------------------------- //

  event SellingPercentageModified(uint256 percentage);
  event TokenValueConversionModified(uint256 value);
  event TokenCreated(string name, string symbol);
  event TokenActiveStatusChanged(bool newActiveStatus, address tokenOwnerAddress);
  event WorkerResgistered(bytes32 id, address tokenOwnerAddress);
  event TokensTransferedFromCompanyToWorker(bytes32 id, uint256 amount);
  event TokensTransferedFromWorkerToWorker(bytes32 from, bytes32 to, uint256 amount);
  event TokensBurned(bytes32 id, uint256 amount);
  event Withdraw(uint256 amount);

  //-------------------------------- //
  // MODIFIERS
  //-------------------------------- //

  /**
   * @dev Verify sellingPercentageDefined is defined
   */
  modifier sellingPercentageDefined() {
    require (sellingPercentage > 0);
    _;
  }

  /**
   * @dev Verify tokenValueConversion is defined
   */
  modifier tokenValueConversionDefined() {
    require (tokenValueConversion > 0);
    _;
  }

  /**
   * @dev Verify that company has a token registered
   */
  modifier registeredToken() {
    require (companyToken[msg.sender].registered == true);
    _;
  }

  /**
   * @dev Verify that company has an active token
   * @param _companyAddress Address of the company
   */
  modifier activeToken(address _companyAddress) {
    require (companyToken[_companyAddress].active == true);
    _;
  }

  /**
   * @dev Verify that company has an inactive token
   * @param _companyAddress Address of the company
   */
  modifier inactiveToken(address _companyAddress) {
    require (companyToken[_companyAddress].active == false);
    _;
  }

  /**
   * @dev Verify that is not already registered for that company
   * @param _workerId worker id from the DB
   * @param _companyAddress Address of the company
   */
  modifier workerUnregistered(bytes32 _workerId, address _companyAddress) {
    require (workerCompanyAddress[_workerId] != _companyAddress);
    _;
  }

  /**
   * @dev Verify that is already registered for that company
   * @param _workerId worker id from the DB
   * @param _companyAddress Address of the company
   */
  modifier workerRegistered(bytes32 _workerId, address _companyAddress) {
    require (workerCompanyAddress[_workerId] == _companyAddress);
    _;
  }

  /**
   * @dev Verify caller as a trsuted signer
   */
  modifier verifyCaller() {
    require (trustedSigner[msg.sender] == true);
    _;
  }

  /**
   * @dev Verify that paid amount is enough
   * @param _amount amount of tokens to buy
   */
  modifier paidEnough(uint256 _amount) {
    uint256 transactionCost = _amount * tokenValueConversion;
    uint256 transactionFee = transactionCost * sellingPercentage / 100;
    require(msg.value >= transactionCost + transactionFee);
    _;
  }

  /**
   * @dev Refund extra costs of the process if needed
   * @param _amount amount of tokens to buy
   */
  modifier refundExtraCosts(uint256 _amount) {
    _;
    uint256 transactionCost = _amount * tokenValueConversion;
    uint256 transactionFee = transactionCost * sellingPercentage / 100;
    uint256 amountToRefund = msg.value - transactionCost - transactionFee;
    msg.sender.transfer(amountToRefund);
  }

  /**
   * @dev Verify that worker has enough tokens to transfer
   * @param _workerId worker id from the DB
   * @param _companyAddress Address of the company
   * @param _amount Amount willing to transfer/burn
   */
  modifier enoughTransferableTokens(bytes32 _workerId, address _companyAddress, uint256 _amount) {
    (uint256 transferableTokens,) = workerBalance(_workerId, _companyAddress);
    require(transferableTokens >= _amount);
    _;
  }

  /**
   * @dev Verify that worker has enough tokens to burn
   * @param _workerId worker id from the DB
   * @param _companyAddress Address of the company
   * @param _amount Amount willing to transfer/burn
   */
  modifier enoughBurnableTokens(bytes32 _workerId, address _companyAddress, uint256 _amount) {
    (,uint256 burnableTokens) = workerBalance(_workerId, _companyAddress);
    require(burnableTokens >= _amount);
    _;
  }

  //-------------------------------- //
  // SETTERS
  //-------------------------------- //
  
  // Initializer function (replaces constructor)
  /**
   * @dev Initializer function (replaces constructor)
   * @param _owner Defines the owner of the contract
   */
  function initialize(address _owner)
    public
    initializer
  {
    Ownable.initialize(_owner);
  }

  /**
   * @dev Set Selling Value (only owner of the contract)
   * @param _value selling value of the token
   */
  function setSellingPercentage(uint256 _value)
    public
    onlyOwner
  {
    sellingPercentage = _value;

    emit SellingPercentageModified(_value);
  }

  /**
   * @dev Set Token value conversion (only owner of the contract)
   * @param _value selling value of the token
   */
  function setTokenValueConversion(uint256 _value)
    public
    onlyOwner
  {
    tokenValueConversion = _value;

    emit TokenValueConversionModified(_value);
  }

  /**
   * @dev Set trusted signer (it's the platform address)
   * @param _trustedSigner address of contract addres who calls transfer
   */
  function setTrustedSigner(address _trustedSigner)
    public
    onlyOwner
  {
    trustedSigner[_trustedSigner] = true;
  }

  /**
   * @dev Create a new token by a company
   * @param _name Id of the company worker from the DB
   * @param _symbol Id of the company worker from the DB
   * @return Success token creation
   */
  function createToken(string memory _name, string memory _symbol)
    public
    sellingPercentageDefined
  {
    companyToken[msg.sender].name = _name;
    companyToken[msg.sender].symbol = _symbol;
    companyToken[msg.sender].active = true;
    companyToken[msg.sender].registered = true;

    emit TokenCreated(_name, _symbol);
  }

  /**
   * @dev Create a new token by a company
   * @param _newActiveStatus New status of the company token (true|false)
   */
  function setTokenActive(bool _newActiveStatus)
    public
    registeredToken
  {
    if (_newActiveStatus == true) {
      _setTokenAsActive(msg.sender);
    } else {
      _setTokenAsInactive(msg.sender);
    }

    emit TokenActiveStatusChanged(_newActiveStatus, msg.sender);
  }

  /**
   * @dev Set company token as active (internal function)
   * @param _companyAddress Address of the company owner of the token
   */
  function _setTokenAsActive(address _companyAddress)
    internal
    inactiveToken(_companyAddress)
  {
    companyToken[_companyAddress].active = true;
  }

  /**
   * @dev Set company token as inactive (internal function)
   * @param _companyAddress Address of the company owner of the token
   */
  function _setTokenAsInactive(address _companyAddress)
    internal
    activeToken(_companyAddress)
  {
    companyToken[_companyAddress].active = false;
  }

  /**
   * @dev Register a new company worker inside the company token
   * @param _workerId Id of the company worker from DB
   */
  function registerWorker(bytes32 _workerId)
    public
    activeToken(msg.sender)
    workerUnregistered(_workerId, msg.sender)
  {
    companyToken[msg.sender].transferableTokens[_workerId] = 0;
    companyToken[msg.sender].burnableTokens[_workerId] = 0;
    workerCompanyAddress[_workerId] = msg.sender;

    emit WorkerResgistered(_workerId, msg.sender);
  }

  /**
   * @dev Transfer tokens from company to worker
   * @param _workerId Id of the company worker from DB
   * @param _amount Amount of tokens transfered to worker
   */
  function transferTokensFromCompanyToWorker(bytes32 _workerId, uint256 _amount)
    public
    payable
    activeToken(msg.sender)
    tokenValueConversionDefined
    workerRegistered(_workerId, msg.sender)
    paidEnough(_amount)
    refundExtraCosts(_amount)
  {
    companyToken[msg.sender].transferableTokens[_workerId] += _amount;

    emit TokensTransferedFromCompanyToWorker(_workerId, _amount);
  }

  /**
   * @dev Transfer tokens from worker to worker
   * @param _from Id of the company worker from DB who sends tokens
   * @param _to Id of the company worker from DB who receives tokens
   * @param _companyAddress Address of the company owner of the token
   * @param _amount Amount of tokens transfered to worker
   */
  function transferTokensFromWorkerToWorker(bytes32 _from, bytes32 _to, address _companyAddress, uint256 _amount)
    public
    verifyCaller
    activeToken(_companyAddress)
    workerRegistered(_from, _companyAddress)
    workerRegistered(_to, _companyAddress)
    enoughTransferableTokens(_from, _companyAddress, _amount)
  {
    address companyAddress = _companyAddress;
    bytes32 from = _from;
    bytes32 to = _to;
    uint256 amount = _amount;

    companyToken[companyAddress].transferableTokens[from] -= amount;
    companyToken[companyAddress].burnableTokens[to] += amount;

    emit TokensTransferedFromWorkerToWorker(from, to, amount);
  }

  /**
   * @dev Burn tokens of the worker (action processed when worker exchange tokens)
   * @param _workerId Id of the company worker from DB who wants to burn tokens
   * @param _companyAddress Address of the company owner of the token
   * @param _amount Amount of tokens transfered to worker
   */
  function burnTokens(bytes32 _workerId, address _companyAddress, uint256 _amount)
    public
    verifyCaller
    activeToken(_companyAddress)
    workerRegistered(_workerId, _companyAddress)
    enoughBurnableTokens(_workerId, _companyAddress, _amount)
  {
    companyToken[_companyAddress].burnableTokens[_workerId] -= _amount;

    emit TokensBurned(_workerId, _amount);
  }

  // /**
  //  * @dev Withdraw contract funds to the contract owner
  //  * @notice If amount willing to transfer is more than the current
  //  *         contract balance, all the funds are withdraw
  //  */
  // function withdraw()
  //   public
  //   onlyOwner
  // {
  //   // uint256 amountToWithdraw = _amount;
  //   // uint256 contractBalance = address(this).balance;

  //   // if (_amount > contractBalance) {
  //   //   amountToWithdraw = contractBalance;
  //   // }

  //   msg.sender.transfer(address(this).balance);

  //   // emit Withdraw(amountToWithdraw);
  // }

  //-------------------------------- //
  // GETTERS
  //-------------------------------- //

  /**
   * @dev Get the worker balance
   * @param _workerId Id of the company worker from DB
   * @param _companyAddress Company address
   * @return Worker Token Balance
   */
  function workerBalance(bytes32 _workerId, address _companyAddress)
    public
    view
    workerRegistered(_workerId, _companyAddress)
    returns (uint256 transferableTokens, uint256 burnableTokens)
  {
    transferableTokens = companyToken[_companyAddress].transferableTokens[_workerId];
    burnableTokens = companyToken[_companyAddress].burnableTokens[_workerId];
  }
  
}