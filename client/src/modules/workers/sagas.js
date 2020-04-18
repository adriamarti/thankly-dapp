// External Dependencies
import { takeLatest, put, call } from 'redux-saga/effects';

// Internal Dependencies
import { GET } from '../../api';

import {
  GET_WORKERS_REQUESTED,
  GET_WORKERS_SUCCEEDED,
  GET_WORKERS_FAILED,
} from './action-types';


export function* getWorkers({ companyId }) {
  try {
    const data = yield call(GET, `workers?companyId=${companyId}`);
    yield put({ type: GET_WORKERS_SUCCEEDED, data });
  } catch (error) {
    console.log(error)
    yield put({ type: GET_WORKERS_FAILED, error });
  }
}

export default function* getWorkersSaga() {
  yield takeLatest(GET_WORKERS_REQUESTED, getWorkers);
}