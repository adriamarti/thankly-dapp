const web3 = require('Web3');
const Token = artifacts.require("Token");

module.exports = async (deployer, network, accounts) => {
  // Needed variable during the contract deployment
  const owner =  accounts[0];
  // Deploy contract
  await deployer.deploy(Token, {from: owner});
  // Get deployed contract instance
  const tokenInstance = await Token.deployed();
  // Initialize the contract
  await tokenInstance.initialize('1.0.0', owner, { from: owner });
  // Print deployed contract address
  console.log('Token Contract Address:', tokenInstance.address)
};