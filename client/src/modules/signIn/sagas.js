// External Dependencies
import { takeLatest, put, call } from 'redux-saga/effects';

// Internal Dependencies
import { POST } from '../../api';

import {
  SIGN_IN_REQUESTED,
  SIGN_IN_SUCCEEDED,
  SIGN_IN_FAILED,
} from './action-types';


export function* signIn({ email, password, typeOfUser}) {
  try {
    const data = yield call(POST, `${typeOfUser}/login`, { email, password });
    yield put({ type: SIGN_IN_SUCCEEDED, data });
  } catch (error) {
    console.log(error)
    yield put({ type: SIGN_IN_FAILED, error });
  }
}

export default function* signInSaga() {
  yield takeLatest(SIGN_IN_REQUESTED, signIn);
}
