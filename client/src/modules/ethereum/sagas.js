// External Dependencies
import { takeLatest, put } from 'redux-saga/effects';
import { createSmartContractInstance } from '../../ethereum'

import {
  GET_ETHEREUM_ADDRESS_REQUESTED,
  GET_ETHEREUM_ADDRESS_SUCCEEDED,
  GET_ETHEREUM_ADDRESS_FAILED,
  GET_ETHEREUM_NETWORK_REQUESTED,
  GET_ETHEREUM_NETWORK_SUCCEEDED,
  GET_ETHEREUM_NETWORK_FAILED,
  CREATE_CONTRACT_INTERFACE,
  SET_CONTRACT_INTERFACE
} from './action-types';


export function* getEthereumAddress() {
  try {
    const { selectedAddress } = window.ethereum;
    yield put({ type: GET_ETHEREUM_ADDRESS_SUCCEEDED, selectedAddress });
  } catch (error) {
    console.log(error)
    yield put({ type: GET_ETHEREUM_ADDRESS_FAILED, error });
  }
}

export function* getEthereumNetwork() {
  try {
    const { networkVersion } = window.ethereum;
    yield put({ type: GET_ETHEREUM_NETWORK_SUCCEEDED, networkVersion });
  } catch (error) {
    console.log(error)
    yield put({ type: GET_ETHEREUM_NETWORK_FAILED, error });
  }
}

export function* createContractInterface({ web3Instance, contractAddress}) {
  try {
    const smartContractInstance = createSmartContractInstance(web3Instance, contractAddress);
    yield put({ type: SET_CONTRACT_INTERFACE, smartContractInstance });
  } catch (error) {
    console.log(error)
  }
}

export default function* getTokenSaga() {
  yield takeLatest(GET_ETHEREUM_ADDRESS_REQUESTED, getEthereumAddress);
  yield takeLatest(GET_ETHEREUM_NETWORK_REQUESTED, getEthereumNetwork);
  yield takeLatest(CREATE_CONTRACT_INTERFACE, createContractInterface)
}
