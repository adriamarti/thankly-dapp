// External Dependencies
import { takeLatest, put, call } from 'redux-saga/effects';

// Internal Dependencies
import { getToken } from '../../ethereum';

import {
  GET_TOKEN_REQUESTED,
  GET_TOKEN_SUCCEEDED,
  GET_TOKEN_FAILED,
} from './action-types';

export function* getToken({ companyAddress }) {
  try {
    const data = yield call(getToken, companyAddress);
    yield put({ type: GET_TOKEN_SUCCEEDED, data });
  } catch (error) {
    console.log(error)
    yield put({ type: GET_TOKEN_FAILED, error });
  }
}

export default function* getTokenSaga() {
  yield takeLatest(GET_TOKEN_REQUESTED, getToken);
}
