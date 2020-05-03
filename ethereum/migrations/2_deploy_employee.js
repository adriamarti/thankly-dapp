const web3 = require('Web3');
const Employee = artifacts.require("Employee");

module.exports = async (deployer, network, accounts) => {
  // Needed variable during the contract deployment
  const owner =  accounts[0];
  // Deploy contract
  await deployer.deploy(Employee, {from: owner});
  // Get deployed contract instance
  const employeeInstance = await Employee.deployed();
  // Print deployed contract address
  console.log('Deployed Contract Address:', employeeInstance.address)
};