// External Dependencies
import update from 'immutability-helper';

// Internal Dependencies
import {
  GET_WORKERS_SUCCEEDED,
  REGISTER_WORKERS_SUCCEEDED,
  ADD_TRANSACTION_SUCCEEDED,
  SEND_TOKENS_SUCCEEDED,
} from './action-types';

const initialState = {};

export function setWorkers(state, { data }) {
  return update(state, { $set: data });
}

export function addRegisteredWorker(state, { data }) {
  return update(state, {
    workers: { $push: [data] },
    inactive: { $apply: function(x) {return x + 1;}}
  });
}

export function addTransaction(state, { transactions }) {
  console.log(transactions)
  return update(state, {
    workers: { $apply: function(workers) {
      return workers.map((worker) => {
        if (worker._id === transactions.to) {
          return {
            ...worker,
            transactions: [...worker.transactions, transactions]
          }
        }

        if (worker._id === transactions.from) {
          return {
            ...worker,
            transactions: [...worker.transactions, transactions]
          }
        }

        return worker;
      })
    }}
  });
}

export default function workersReducer(state = initialState, action) {
  switch (action && action.type) {
    case GET_WORKERS_SUCCEEDED:
      return setWorkers(state, action);
    case REGISTER_WORKERS_SUCCEEDED:
      return addRegisteredWorker(state, action);
    case ADD_TRANSACTION_SUCCEEDED:
      return addTransaction(state, action);
    case SEND_TOKENS_SUCCEEDED:
      return addTransaction(state, action);
    default:
      return state;
  }
}