// External Dependencies
import { takeLatest, put, call } from 'redux-saga/effects';

// Internal Dependencies
import { getToken } from '../../ethereum';

import {
  GET_TOKEN_REQUESTED,
  GET_TOKEN_SUCCEEDED,
  GET_TOKEN_FAILED,
} from './action-types';

export function* getTokenData({ contract, address }) {
  console.log(contract, address)
  try {
    const data = yield call(getToken, contract, address);
    yield put({ type: GET_TOKEN_SUCCEEDED, data });
  } catch (error) {
    console.log(error)
    yield put({ type: GET_TOKEN_FAILED, error });
  }
}

export default function* getTokenSaga() {
  yield takeLatest(GET_TOKEN_REQUESTED, getTokenData);
}
