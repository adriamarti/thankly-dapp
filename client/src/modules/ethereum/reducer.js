// External Dependencies
import update from 'immutability-helper';

// Internal Dependencies
import {
  GET_ETHEREUM_ADDRESS_SUCCEEDED,
  GET_ETHEREUM_NETWORK_SUCCEEDED,
  SET_CONTRACT_INTERFACE,
} from './action-types';

const initialState = {};

export function setEthereumAddress(state, { selectedAddress }) {
  return update(state, {
    selectedAddress: { $set: selectedAddress },
  });
}

export function setEthereumNetwork(state, { networkVersion }) {
  return update(state, {
    networkVersion: { $set: networkVersion },
  });
}

export function setSmartContractInstance(state, { smartContractInstance }) {
  return update(state, {
    smartContractInstance: { $set: smartContractInstance },
  });
}

export default function ethereumReducer(state = initialState, action) {
  switch (action && action.type) {
    case GET_ETHEREUM_ADDRESS_SUCCEEDED:
      return setEthereumAddress(state, action);
    case GET_ETHEREUM_NETWORK_SUCCEEDED:
      return setEthereumNetwork(state, action);
    case SET_CONTRACT_INTERFACE:
      return setSmartContractInstance(state, action);
    default:
      return state;
  }
}
