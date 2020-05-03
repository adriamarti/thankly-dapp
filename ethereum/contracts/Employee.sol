pragma solidity ^ 0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";

/**
 * @title Employees
 * @dev Smart Contract used to create eployees for an specific company token
 */

contract Employee is Initializable {

  //-------------------------------- //
  // STORAGE
  //-------------------------------- //

  string public version;

  struct Employee {
    address companyEthereumAddress;
    bool active;
    bool registered;
    uint256 transferableTokens;
    uint256 burnableTokens;
  }

  // The bytes32 will be the hashed email employee
  mapping (bytes32 => Employee) public employee;

  //-------------------------------- //
  // EVENTS
  //-------------------------------- //
  
  event Created(address companyEthereumAddress, bytes32 employeeId);
  event ActiveStatusModified(bytes32 employeeId, bool active);
  event RegisteredStatusModified(bytes32 employeeId, bool registered);
  event IncreaseTransferableTokens(bytes32 _employeeId, uint256 _amount);
  event DecreaseTransferableTokens(bytes32 _employeeId, uint256 _amount);
  event IncreaseBurnableTokens(bytes32 _employeeId, uint256 _amount);
  event DecreaseBurnableTokens(bytes32 _employeeId, uint256 _amount);

  //-------------------------------- //
  // MODIFIERS
  //-------------------------------- //

  /**
   * @dev Verify that employee is not registered
   * @param _employeeId employeeId
   */
  modifier isNotRegistered(bytes32 _employeeId) {
    require (employee[_employeeId].registered == false);
    _;
  }
  
  /**
   * @dev Verify that employee is registered
   * @param _employeeId employeeId
   */
  modifier isRegistered(bytes32 _employeeId) {
    require (employee[_employeeId].registered == true);
    _;
  }

  /**
   * @dev Verify that employee has enough transferable tokens
   * @param _employeeId employeeId
   */
  modifier enoughTranferableTokens(bytes32 _employeeId, uint256 _amount) {
    require (employee[_employeeId].transferableTokens >= _amount);
    _;
  }

  /**
   * @dev Verify that employee has enough burnable tokens
   * @param _employeeId employeeId
   */
  modifier enoughBurnableTokens(bytes32 _employeeId, uint256 _amount) {
    require (employee[_employeeId].burnableTokens >= _amount);
    _;
  }

  //-------------------------------- //
  // SETTERS
  //-------------------------------- //
  
  /**
   * @dev Initializer function (replaces constructor)
   * @param _version Version of the deployed contract
   */
  function initialize(string memory _version)
    public
    initializer
  {
    version = _version;
  }

  /**
   * @dev Create employee
   * @param _employeeId id of the employee
   */
  function create(bytes32 _employeeId)
    public
    isNotRegistered(_employeeId)
  {
    employee[_employeeId].companyEthereumAddress = msg.sender;
    employee[_employeeId].active = false;
    employee[_employeeId].registered = true;
    employee[_employeeId].transferableTokens = 0;
    employee[_employeeId].burnableTokens = 0;

    emit Created(msg.sender, _employeeId);
  }

  /**
   * @dev Modify employee active status
   * @param _employeeId id of the employee
   * @param _activeStatus new status
   */
  function modifyActiveStatus(bytes32 _employeeId, bool _activeStatus)
    public
    isRegistered(_employeeId)
  {
    employee[_employeeId].active = _activeStatus;

    emit ActiveStatusModified(_employeeId, _activeStatus);
  }

  /**
   * @dev Modify employee active status
   * @param _employeeId id of the employee
   * @param _registeredStatus new registeredStatus
   */
  function modifyRegisteredStatus(bytes32 _employeeId, bool _registeredStatus)
    public
    isRegistered(_employeeId)
  {
    employee[_employeeId].registered = _registeredStatus;

    emit RegisteredStatusModified(_employeeId, _registeredStatus);
  }

  /**
   * @dev Increease employee transferable tokens
   * @param _employeeId id of the employee
   * @param _amount amount to increase
   */
  function increaseTransferableTokens(bytes32 _employeeId, uint256 _amount)
    public
    isRegistered(_employeeId)
  {
    employee[_employeeId].transferableTokens += _amount;

    emit IncreaseTransferableTokens(_employeeId, _amount);
  }

  /**
   * @dev Decrease employee transferable tokens
   * @param _employeeId id of the employee
   * @param _amount amount to decrease
   */
  function decreaseTransferableTokens(bytes32 _employeeId, uint256 _amount)
    public
    isRegistered(_employeeId)
    enoughTranferableTokens(_employeeId, _amount)
  {
    employee[_employeeId].transferableTokens -= _amount;

    emit IncreaseTransferableTokens(_employeeId, _amount);
  }

  /**
   * @dev Increease employee buranble tokens
   * @param _employeeId id of the employee
   * @param _amount amount to increase
   */
  function increaseBurnableTokens(bytes32 _employeeId, uint256 _amount)
    public
    isRegistered(_employeeId)
  {
    employee[_employeeId].burnableTokens += _amount;

    emit IncreaseBurnableTokens(_employeeId, _amount);
  }

  /**
   * @dev Decrease employee buranble tokens
   * @param _employeeId id of the employee
   * @param _amount amount to decrease
   */
  function decreaseBurnableTokens(bytes32 _employeeId, uint256 _amount)
    public
    isRegistered(_employeeId)
    enoughBurnableTokens(_employeeId, _amount)
  {
    employee[_employeeId].burnableTokens -= _amount;

    emit IncreaseBurnableTokens(_employeeId, _amount);
  }
  
}