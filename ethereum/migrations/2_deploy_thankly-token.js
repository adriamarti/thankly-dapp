const web3 = require('Web3');
const ThanklyToken = artifacts.require("ThanklyToken");

module.exports = async (deployer, network, accounts) => {
  // Needed variable during the contract deployment
  const owner =  accounts[0];
  const initialSellingPercentage = 10;
  const initialTokenValueConversion = web3.utils.toWei('1', 'shannon');
  // Deploy contract
  await deployer.deploy(ThanklyToken, {from: owner});
  // Get deployed contract instance
  const thanklyTokenInstance = await ThanklyToken.deployed();
  // Initialize the contract
  await thanklyTokenInstance.initialize(owner, { from: owner });
  // Set selling percentage
  await thanklyTokenInstance.setSellingPercentage(initialSellingPercentage, { from: owner })
  // Set token value conversion
  await thanklyTokenInstance.setTokenValueConversion(initialTokenValueConversion, { from: owner })
  // Set trusted signer
  await thanklyTokenInstance.setTrustedSigner(owner, { from: owner })
  // Print deployed contract address
  console.log('Deployed Contract Address:', thanklyTokenInstance.address)
};