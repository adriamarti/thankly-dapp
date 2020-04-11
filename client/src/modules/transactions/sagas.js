// External Dependencies
import { takeLatest, put, call } from 'redux-saga/effects';

// Internal Dependencies
// import { GET } from '../../api';
import {
  GET_FIDEL_TRANSACTIONS_REQUESTED,
  GET_FIDEL_TRANSACTIONS_SUCCEEDED,
  GET_FIDEL_TRANSACTIONS_FAILED,
  GET_S_FIDEL_TRANSACTIONS_REQUESTED,
  GET_S_FIDEL_TRANSACTIONS_SUCCEEDED,
  GET_S_FIDEL_TRANSACTIONS_FAILED,
} from './action-types';

// @TODO: remove that and call to the api
const fidelTransactions = [
  {
    type: 'income',
    date: '2019-20-11',
    owner: {
      address: 'GCXHV7JDD5EDPR5VNM3OWIRRICPEKA73LYZIWABHDKSGREHLGZ6F5TOR',
      type: 'Proceso de compensación'
    },
    amount: '3,23',
    id: 'RXZSNVRoUnBHUHFVZW0rV3ZmektNUdT09',
  },
  {
    type: 'outcome',
    date: '2019-20-11',
    owner: {
      address: 'GCTK5BZCQPXN6EGXZHJPOVPFGTXLMPGNJW5ZFHUPEHKZ42N5EG4QVPWN',
      type: 'Entrega a cliente'
    },
    amount: '-1,23',
    id: 'RXZSNVRoUnBHUHFVZtW0rV3ZmektNUT09',
  },
  {
    type: 'income',
    date: '2019-20-11',
    owner: {
      address: 'SAZVZEUVSWO2R7EDRKV4C4SCFORQVHDYJ4H4NYBRMYTIQQV6FVYO6QQN',
      type: 'Compra de Fidels'
    },
    amount: '200',
    id: 'RXZSNVRoUnBHUHFVZWi0rV3ZmektNUT09',
  },
  {
    type: 'outcome',
    date: '2019-20-11',
    owner: {
      address: 'GCTK5BZCQPXN6EGXZHJPOVPFGTXLMPGNJW5ZFHUPEHKZ42N5EG4QVPWN',
      type: 'Entrega a cliente'
    },
    amount: '-1,23',
    id: 'RXZSNVRoUnBHUaHFVZW0rV3ZmektNUT09',
  },
  {
    type: 'income',
    date: '2019-20-11',
    owner: {
      address: 'GCXHV7JDD5EDPR5VNM3OWIRRICPEKA73LYZIWABHDKSGREHLGZ6F5TOR',
      type: 'Proceso de compensación'
    },
    amount: '6,98',
    id: 'RXZSNVRoUnBHUHFVdZW0rV3ZmektNUT09',
  },
];

export function* getFidelTransactions() {
  try {
    // const data = yield call(GET, '/profile/invitations');
    const payload = { transactions: fidelTransactions }
    yield put({ type: GET_FIDEL_TRANSACTIONS_SUCCEEDED, payload });
  } catch (error) {
    yield put({ type: GET_FIDEL_TRANSACTIONS_FAILED, error });
  }
}

export default function* invitationsSaga() {
  yield takeLatest(GET_FIDEL_TRANSACTIONS_REQUESTED, getFidelTransactions);
}
