// External Dependencies
import React, { useEffect } from 'react';
import Web3 from 'web3';

// Internal Dependencies
import Router from '../../root/router';

const App = ({ getEthereumAddress, getEthereumNetwork, setSmartContract }) => {

  const fetchEthereum = async (ethereum) => {
    // @ TODO should show a pop-up indicating that we enable access to the metamask
    await ethereum.enable();

    // Get the selected address from Metamask
    getEthereumAddress();

    // Get the network address from Metamask
    getEthereumNetwork();

    // Set ThanklyToken Smart Contract Interface
    const web3 = new Web3(ethereum);
    const thanklyTokenContractAddress = '0xbb3aC9e32b6d9ddD04E730733F4A1F593461DC49';
    setSmartContract(web3, thanklyTokenContractAddress)

    // Subscribe on account change
    ethereum.on('accountsChanged', () => {
      getEthereumAddress();
    })
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      // @ TODO should show a pop-up indicating that we enable access to the metamask
      fetchEthereum(window.ethereum);
    }
  }, [window['ethereum']])

  return (
    <Router />
  );
}

export default App;
