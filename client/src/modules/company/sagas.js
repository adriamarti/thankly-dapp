// External Dependencies
import { takeLatest, put, call } from 'redux-saga/effects';

// Internal Dependencies
import { GET } from '../../api';

import {
  GET_COMPANY_REQUESTED,
  GET_COMPANY_SUCCEEDED,
  GET_COMPANY_FAILED,
} from './action-types';

export function* getWorkers({ companyId }) {
  try {
    const data = yield call(GET, `companies/${companyId}`);
    yield put({ type: GET_COMPANY_SUCCEEDED, data });
  } catch (error) {
    console.log(error)
    yield put({ type: GET_COMPANY_FAILED, error });
  }
}


export default function* getWorkersSaga() {
  yield takeLatest(GET_COMPANY_REQUESTED, getWorkers);
}