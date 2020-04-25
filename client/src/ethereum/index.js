import ThanklyTokenJsonInterface from './contracts/ThanklyToken.json';
import Web3 from 'web3';

export const createSmartContractInstance = (web3Instance, thanklyTokenContractAddress) => {
  try {
    const thanklyTokenContract = new web3Instance.eth.Contract(ThanklyTokenJsonInterface.abi, thanklyTokenContractAddress);

    return thanklyTokenContract;
  } catch(err) {
    throw new Error(err);
  }
}

export const getToken = async (contract, address, workerId = null) => {
  try {
    const token = await contract.methods.companyToken(address).call();
    if (workerId) {
      const { transferableTokens, burnableTokens } = await contract.methods
        .workerBalance(Web3.utils.toHex(workerId), address).call();
      token.balance = {
        transferableTokens,
        burnableTokens
      }

      const { name, symbol, totalSupplied, totalTransfered, totalBurned, balance } = token;

      return { name, symbol, totalSupplied, totalTransfered, totalBurned, balance }
    }

    const { name, symbol, totalSupplied, totalTransfered, totalBurned } = token;

    return { name, symbol, totalSupplied, totalTransfered, totalBurned };
  } catch(err) {
    throw new Error(err);
  }
}

// export const createToken = async (contract, address, name, symbol) => {
//   try {
//     const tokenCreated = await contract.methods
//       .createToken(name, symbol)
//       .send({ from: address });

//     return tokenCreated;
//   } catch(err) {
//     throw new Error(err);
//   }
// }

// export const registerComapny = async (ethereumAddress) => {
//   try {

//     var contractAbi = web3.eth.contract(ThanklyTokenJsonInterface.abi);
//     var myContract = contractAbi.at(thanklyTokenContractAddress);
//     // suppose you want to call a function named myFunction of myContract
//     var getData = myContract.registerCompany.getData();
//     console.log(getData)
//     // finally pass this data parameter to send Transaction
//     // web3.eth.sendTransaction({to:Contractaddress, from:Accountaddress, data: getData});

//     // const transaction = await thanklyTokenContract.methods.registerCompany()
//     //   .send({ from: ethereumAddress, gas: 21000 });

//     // console.log(transaction);

//     // return transaction;
//   } catch(err) {
//     console.log(JSON.stringify(err.message))
//     throw new Error(err);
//   }
// }

// export const createToken = async (companyAddress, currencyName, currencySymbol) => {
//   try {
//     const transaction = await thanklyTokenContract.methods.companyToken(currencyName, currencySymbol).send({ from: companyAddress });

//     console.log(transaction);

//     return transaction;
//   } catch(err) {
//     throw new Error(err);
//   }
// }

// export const getSellingPercentage = async () => {
//   const sellingPercentage = await thanklyTokenContract.methods.sellingPercentage().call();

//   return sellingPercentage;
// };
