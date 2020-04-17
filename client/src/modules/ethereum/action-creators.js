// Internal Dependencies
import {
  GET_ETHEREUM_ADDRESS_REQUESTED,
  GET_ETHEREUM_NETWORK_REQUESTED,
  CREATE_CONTRACT_INTERFACE,
} from './action-types';

export const getEthereumAddressRequested = () => ({
  type: GET_ETHEREUM_ADDRESS_REQUESTED,
});

export const getEthereumNetworkRequested = () => ({
  type: GET_ETHEREUM_NETWORK_REQUESTED,
});

export const createContractInterface = (web3Instance, contractAddress) => ({
  type: CREATE_CONTRACT_INTERFACE,
  web3Instance,
  contractAddress,
});