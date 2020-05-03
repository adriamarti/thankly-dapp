pragma solidity ^ 0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";

/**
 * @title Token
 * @dev Token Smart Contract fro the Thankly Platform, the implementation is
 *      inspired on https://eips.ethereum.org/EIPS/eip-20
 */

contract Token is Initializable, Ownable{

  //-------------------------------- //
  // STORAGE
  //-------------------------------- //

  string public version;

  struct Token {
    string name;
    string symbol;
    uint256 minted;
    uint256 transfered;
    uint256 burned;
    bool paused;
    bool registered; 
  }

  mapping (address => Token) public token;

  //-------------------------------- //
  // EVENTS
  //-------------------------------- //
  
  event Created(address companyEthereumAddress, string name, string symbol);
  event NameModified(address companyEthereumAddress, string name);
  event SymbolModified(address companyEthereumAddress, string symbol);
  event PausedStatusModified(address companyEthereumAddress, bool paused);
  event Minted(address companyEthereumAddress, uint256 amount);
  event Transfered(address companyEthereumAddress, uint256 amount);
  event Burned(address companyEthereumAddress, uint256 amount);

  //-------------------------------- //
  // MODIFIERS
  //-------------------------------- //

  /**
   * @dev Verify that token is not registered
   * @param _tokenOwnerAddress Ethereum Address of the token owner
   */
  modifier isNotRegistered(address _tokenOwnerAddress) {
    require (token[_tokenOwnerAddress].registered == false);
    _;
  }
  
  /**
   * @dev Verify that token is registered
   * @param _tokenOwnerAddress Ethereum Address of the token owner
   */
  modifier isRegistered(address _tokenOwnerAddress) {
    require (token[_tokenOwnerAddress].registered == true);
    _;
  }

  /**
   * @dev Verify that token is not paused
   * @param _tokenOwnerAddress Ethereum Address of the token owner
   */
  modifier isNotPaused(address _tokenOwnerAddress) {
    require (token[_tokenOwnerAddress].paused == false);
    _;
  }

  //-------------------------------- //
  // SETTERS
  //-------------------------------- //
  
  /**
   * @dev Initializer function (replaces constructor)
   * @param _version Version of the deployed contract
   * @param _owner Defines the owner of the contract
   */
  function initialize(string memory _version, address _owner)
    public
    initializer
  {
    Ownable.initialize(_owner);
    version = _version;
  }

  /**
   * @dev Create token
   * @param _name Token name (ie. Thankly Coin)
   * @param _symbol Token symbol (ie. THX)
   */
  function create(string memory _name, string memory _symbol)
    public
    isNotRegistered(msg.sender)
  {
    token[msg.sender].name = _name;
    token[msg.sender].symbol = _symbol;
    token[msg.sender].minted = 0;
    token[msg.sender].transfered = 0;
    token[msg.sender].burned = 0;
    token[msg.sender].paused = false;
    token[msg.sender].registered = true;

    emit Created(msg.sender, _name, _symbol);
  }

  /**
   * @dev Modify token name
   * @param _name new token name
   */
  function modifyName(string memory _name)
    public
    isRegistered(msg.sender)
  {
    token[msg.sender].name = _name;

    emit NameModified(msg.sender, _name);
  }

  /**
   * @dev Modify token name
   * @param _symbol new token symbol
   */
  function modifySymbol(string memory _symbol)
    public
    isRegistered(msg.sender)
  {
    token[msg.sender].symbol = _symbol;

    emit SymbolModified(msg.sender, _symbol);
  }

  /**
   * @dev Modify token name
   * @param _paused new paused status
   */
  function modifyPausedStatus(bool _paused)
    public
    isRegistered(msg.sender)
  {
    token[msg.sender].paused = _paused;

    emit PausedStatusModified(msg.sender, _paused);
  }

  /**
   * @dev Mint new tokens
   * @param _amount Amount of tokens to mint
   */
  function mint(uint256 _amount)
    public
    isRegistered(msg.sender)
    isNotPaused(msg.sender)
  {
    token[msg.sender].minted += _amount;

    emit Minted(msg.sender, _amount);
  }

  /**
   * @dev Transfer tokens
   * @param _amount Amount of tokens to transfer
   */
  function transfer(address _companyEthereumAddress, uint256 _amount)
    public
    onlyOwner
    isRegistered(_companyEthereumAddress)
    isNotPaused(_companyEthereumAddress)
  {
    token[_companyEthereumAddress].minted -= _amount;
    token[_companyEthereumAddress].transfered += _amount;

    emit Transfered(_companyEthereumAddress, _amount);
  }

  /**
   * @dev Burn tokens
   * @param _amount Amount of tokens to burn
   */
  function burn(address _companyEthereumAddress, uint256 _amount)
    public
    onlyOwner
    isRegistered(_companyEthereumAddress)
    isNotPaused(_companyEthereumAddress)
  {
    token[_companyEthereumAddress].transfered -= _amount;
    token[_companyEthereumAddress].burned += _amount;

    emit Burned(_companyEthereumAddress, _amount);
  }
  
}