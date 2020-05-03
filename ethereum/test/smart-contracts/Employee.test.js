const { expectRevert } = require('openzeppelin-test-helpers');
const Web3 = require('Web3');
const faker = require('faker')
const Employee = artifacts.require('Employee');

contract.only('Employee Smart Contract', (accounts) => {
  let employee;
  const contractVersion = '1.0.0';
  const companyAddress = accounts[0];
  const employeeEmail = faker.internet.email();
  const employeeId = Web3.utils.sha3(employeeEmail);

  beforeEach(async () => {
    employee = await Employee.new();
    await employee.initialize(contractVersion);
  })
  
  describe('"initialize" method is called', () => {
    it(`should set version`, async () => {
      const version = await employee.version()

      assert.equal(contractVersion, version);
    })

    it('should revert if the contract is already initialized', async () => {
      await expectRevert.unspecified(
        employee.initialize(contractVersion)
      );
    })
  })

  describe('"create" method is called', () => {
    it('should create a new employee', async () => {
      await employee.create(employeeId, { from: companyAddress })
      const {
        companyEthereumAddress,
        active,
        registered,
        transferableTokens,
        burnableTokens,
      } = await employee.employee(employeeId)
      assert.equal(companyEthereumAddress, companyAddress);
      assert.equal(active, false);
      assert.equal(registered, true);
      assert.equal(transferableTokens, 0);
      assert.equal(burnableTokens, 0);
    })

    it('should revert if the employee is registered', async () => {
      await employee.create(employeeId, { from: companyAddress })
      await expectRevert.unspecified(
        employee.create(employeeId, { from: companyAddress })
      );
    })
  })

  describe('"modifyActiveStatus" method is called', () => {
    it('should modify active status of a registered employee', async () => {
      await employee.create(employeeId, { from: companyAddress })
      await employee.modifyActiveStatus(employeeId, true)
      const { active } = await employee.employee(employeeId)
      assert.equal(active, true);
    })

    it('should revert if the employee is not registered', async () => {
      await expectRevert.unspecified(
        employee.modifyActiveStatus(employeeId, true)
      );
    })
  })

  describe('"modifyRegisteredStatus" method is called', () => {
    it('should modify registered status of a registered employee', async () => {
      await employee.create(employeeId, { from: companyAddress })
      await employee.modifyRegisteredStatus(employeeId, false)
      const { registered } = await employee.employee(employeeId)
      assert.equal(registered, false);
    })

    it('should revert if the employee is not registered', async () => {
      await expectRevert.unspecified(
        employee.modifyRegisteredStatus(employeeId, false)
      );
    })
  })

  describe('"increaseTransferableTokens" method is called', () => {
    it('should increase transferable tokens of a registered employee', async () => {
      await employee.create(employeeId, { from: companyAddress })
      await employee.increaseTransferableTokens(employeeId, 10)
      const { transferableTokens } = await employee.employee(employeeId)
      assert.equal(transferableTokens, 10);
    })

    it('should revert if the employee is not registered', async () => {
      await expectRevert.unspecified(
        employee.increaseTransferableTokens(employeeId, 10)
      );
    })
  })

  describe('"decreaseTransferableTokens" method is called', () => {
    it('should decrease transferable tokens of a registered employee', async () => {
      await employee.create(employeeId, { from: companyAddress })
      await employee.increaseTransferableTokens(employeeId, 10)
      await employee.decreaseTransferableTokens(employeeId, 5)
      const { transferableTokens } = await employee.employee(employeeId)
      assert.equal(transferableTokens, 5);
    })

    it('should revert if the employee is not registered', async () => {
      await expectRevert.unspecified(
        employee.decreaseTransferableTokens(employeeId, 1)
      );
    })

    it('should revert if the employee doesn\'t have enough transferable tokens', async () => {
      await employee.create(employeeId, { from: companyAddress })
      await expectRevert.unspecified(
        employee.decreaseTransferableTokens(employeeId, 1)
      );
    })
  })

  describe('"increaseBurnableTokens" method is called', () => {
    it('should increase burnable tokens of a registered employee', async () => {
      await employee.create(employeeId, { from: companyAddress })
      await employee.increaseBurnableTokens(employeeId, 10)
      const { burnableTokens } = await employee.employee(employeeId)
      assert.equal(burnableTokens, 10);
    })

    it('should revert if the employee is not registered', async () => {
      await expectRevert.unspecified(
        employee.increaseBurnableTokens(employeeId, 10)
      );
    })
  })

  describe('"decreaseBurnableTokens" method is called', () => {
    it('should decrease burnable tokens of a registered employee', async () => {
      await employee.create(employeeId, { from: companyAddress })
      await employee.increaseBurnableTokens(employeeId, 10)
      await employee.decreaseBurnableTokens(employeeId, 5)
      const { burnableTokens } = await employee.employee(employeeId)
      assert.equal(burnableTokens, 5);
    })

    it('should revert if the employee is not registered', async () => {
      await expectRevert.unspecified(
        employee.decreaseBurnableTokens(employeeId, 1)
      );
    })

    it('should revert if the employee doesn\'t have enough burnable tokens', async () => {
      await employee.create(employeeId, { from: companyAddress })
      await expectRevert.unspecified(
        employee.decreaseBurnableTokens(employeeId, 1)
      );
    })
  })
})
