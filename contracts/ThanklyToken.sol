pragma solidity ^ 0.5.0;

import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";

/**
 * @title ThanklyToken
 * @dev This is the Token Smart Contract that will be used to create Tokens for the different companies
 * @notice This smart contract define the data and logic around the token.
 *         This smart contract is inspired by https://eips.ethereum.org/EIPS/eip-20
 */

contract ThanklyToken {

  address private owner;
  mapping (bytes32 => uint256) public balance;
  mapping (bytes32 => bool) public registered;
  string public name;
  string public symbol;
  uint256 public totalSupply;

  event RegisteredWorker(bytes32 id);
  event TransferedTokensFromCompanyToWorker(bytes32 to, uint256 amount);
  event TransferedTokensBetweenWorkers(bytes32 from, bytes32 to, uint256 amount);
  event BurnedTokens(bytes32 from, uint256 amount);

  /**
   * @dev Verify valid owner
   */
  modifier onlyOwner(address _owner) {
    require (owner == _owner);
    _;
  }

  /**
   * @dev Verify worker is registered
   */
  modifier isRegistered(bytes32 _id) {
    require (registered[_id] == true);
    _;
  }

  /**
   * @dev Verify worker is not registered
   */
  modifier isNotRegistered(bytes32 _id) {
    require (registered[_id] == false);
    _;
  }

  /**
   * @dev Verify worker has enough tokens to transfer
   * @param _id Id of the company worker from the DB
   * @param _amount Amount willing to tranfer
   */
  modifier enoughTokens(bytes32 _id, uint256 _amount) {
    require (balance[_id] >= _amount);
    _;
  }

  /**
   * @dev The constructor of the contract to initialize it with some data
   * @notice Intitialize the ownable logic
   * @param _name Name of the token given by the company
   * @param _symbol Symbol of the token given by the company
   */
  constructor(string memory _name, string memory _symbol)
    public
  {
    name = _name;
    symbol = _symbol;
    totalSupply = 0;
    owner = msg.sender;
  }

  /**
   * @dev Create new tokens and transfer to the company worker
   * @param _id Id of the company worker from the DB
   * @return Success register
   */
  function registerWorker(bytes32 _id)
    public
    onlyOwner(msg.sender)
    isNotRegistered(_id)
    returns (bool)
  {
    registered[_id] = true;
    balance[_id] = 0;

    emit RegisteredWorker(_id);

    return true;
  }

  /**
   * @dev Create new tokens and transfer to the company worker
   * @param _to Id of the company worker from the DB
   * @param _amount Amount to transfer to the company worker
   * @return Success transfer
   */
  function transferTokensFromCompanyToWorker(bytes32 _to, uint256 _amount)
    public
    payable
    onlyOwner(msg.sender)
    isRegistered(_to)
    returns (bool)
  {
    // Need to do the operation previously to transfer money to the Thankly Platform
    balance[_to] += _amount;
    totalSupply += totalSupply + _amount;

    emit TransferedTokensFromCompanyToWorker(_to, _amount);

    return true;
  }

  /**
   * @dev Transfer token from worker to another worker
   * @param _to Id of the company worker from the DB
   * @param _from Id of the company worker from the DB
   * @param _amount Amount to transfer to the company worker
   * @return Success transfer
   */
  function transferTokensFromWorkerToWorker(bytes32 _from, bytes32 _to, uint256 _amount)
    public
    isRegistered(_from)
    isRegistered(_to)
    enoughTokens(_from, _amount)
    returns (bool)
  {
    balance[_to] += _amount;
    balance[_from] -= _amount;

    emit TransferedTokensBetweenWorkers(_from, _to, _amount);

    return true;
  }

  /**
   * @dev Burn tokens
   * @param _from Id of the company worker from the DB
   * @param _amount Amount to transfer to the company worker
   * @return Success bruned tokens
   */
  function burnTokens(bytes32 _from, uint256 _amount)
    public
    isRegistered(_from)
    enoughTokens(_from, _amount)
    returns (bool)
  {
    balance[_from] -= _amount;

    emit BurnedTokens(_from, _amount);

    return true;
  }

  
}