// External Dependencies
import { takeLatest, put, call } from 'redux-saga/effects';

// Internal Dependencies
import { POST } from '../../api';
// import { registerComapny } from '../../ethereum'

import {
  SIGN_UP_COMPANY_REQUESTED,
  SIGN_UP_COMPANY_SUCCEEDED,
  SIGN_UP_COMPANY_FAILED,
} from './action-types';

export function* signUpCompany({ email, name, password, ethereumAddress}) {
  console.log('email', email)
  try {
    const data = yield call(POST, `companies/register`, { email, name, password, ethereumAddress });
    // const tx = yield registerComapny(ethereumAddress);
    console.log(data);
    // console.log(tx);
    yield put({ type: SIGN_UP_COMPANY_SUCCEEDED, data });
  } catch (error) {
    console.log(error)
    yield put({ type: SIGN_UP_COMPANY_FAILED, error });
  }
}

export default function* signUpSaga() {
  yield takeLatest(SIGN_UP_COMPANY_REQUESTED, signUpCompany);
}
