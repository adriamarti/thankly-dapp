const web3 = require('Web3');
const Employee = artifacts.require("Employee");

module.exports = async (deployer, network, accounts) => {
  // Needed variable during the contract deployment
  const owner =  accounts[0];
  // Deploy contract
  await deployer.deploy(Employee, {from: owner});
  // Get deployed contract instance
  const employeeInstance = await Employee.deployed();
  // Initialize the contract
  await employeeInstance.initialize('1.0.0', { from: owner });
  // Print deployed contract address
  console.log('Employee Contract Address:', employeeInstance.address)
};