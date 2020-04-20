// External Dependencies
import { takeLatest, put, call } from 'redux-saga/effects';
import Web3 from 'web3';

// Internal Dependencies
import { GET, POST, PUT } from '../../api';

import {
  GET_WORKERS_REQUESTED,
  GET_WORKERS_SUCCEEDED,
  GET_WORKERS_FAILED,
  REGISTER_WORKERS_REQUESTED,
  REGISTER_WORKERS_SUCCEEDED,
  REGISTER_WORKERS_FAILED,
  ADD_TRANSACTION_REQUESTED,
  ADD_TRANSACTION_SUCCEEDED,
  ADD_TRANSACTION_FAILED,
  SEND_TOKENS_REQUESTED,
  SEND_TOKENS_SUCCEEDED,
  SEND_TOKENS_FAILED,
} from './action-types';

const registerWorkerIntoToken = async (companyId, contract, address) => {
  try {
    await contract.methods.registerWorker(companyId).send({ from: address })
  } catch(err) {
    throw err;
  }
}

export function* getWorkers({ companyId }) {
  try {
    const data = yield call(GET, `workers?companyId=${companyId}`);
    yield put({ type: GET_WORKERS_SUCCEEDED, data });
  } catch (error) {
    console.log(error)
    yield put({ type: GET_WORKERS_FAILED, error });
  }
}

export function* registerWorker({ companyId, email, name, pathwayId, contract, address }) {
  console.log(companyId, email, name, pathwayId, contract, address)
  let isRegisteredIntoDB = false;
  try {
    const data = yield call(POST, `workers/pre-register`, { companyId, email, name, pathwayId });
    isRegisteredIntoDB = true;
    registerWorkerIntoToken(Web3.utils.toHex(data._id), contract, address)
    yield put({ type: REGISTER_WORKERS_SUCCEEDED, data });
  } catch (error) {
    if (isRegisteredIntoDB) {
      // @TODO remove registered worker if fails something 
    }
    console.log(error)
    yield put({ type: REGISTER_WORKERS_FAILED, error });
  }
}

export function* addTransaction({ transactions }) {
  try {
    yield call(PUT, `workers/${transactions.to}`, { transactions });
    yield put({ type: ADD_TRANSACTION_SUCCEEDED, transactions });
  } catch (error) {
    console.log(error)
    yield put({ type: ADD_TRANSACTION_FAILED, error });
  }
}

export function* sendTokens({ payload }) {
  try {
    const transactions = yield call(POST, `transactions`, payload);
    yield put({ type: SEND_TOKENS_SUCCEEDED, transactions });
  } catch (error) {
    console.log(error)
    yield put({ type: SEND_TOKENS_FAILED, error });
  }
}

export default function* getWorkersSaga() {
  yield takeLatest(GET_WORKERS_REQUESTED, getWorkers);
  yield takeLatest(REGISTER_WORKERS_REQUESTED, registerWorker);
  yield takeLatest(ADD_TRANSACTION_REQUESTED, addTransaction);
  yield takeLatest(SEND_TOKENS_REQUESTED, sendTokens);
}