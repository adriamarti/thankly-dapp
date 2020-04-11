// External Dependencies
import update from 'immutability-helper';

// Internal Dependencies
import {
  GET_FIDEL_TRANSACTIONS_SUCCEEDED,
  GET_S_FIDEL_TRANSACTIONS_SUCCEEDED,
} from './action-types';

const initialState = {
  fidel: [],
  sFidel: []
};

export function getTransactions(state, { payload }, transactionType) {
  const newTransactions = [...state[transactionType], ...payload.transactions]
  return update(state, { $merge: { [transactionType]: newTransactions} });
}

export default function transactionsReducer(state = initialState, action) {
  switch (action && action.type) {
    case GET_FIDEL_TRANSACTIONS_SUCCEEDED:
      return getTransactions(state, action, 'fidel');
    case GET_S_FIDEL_TRANSACTIONS_SUCCEEDED:
      return getTransactions(state, action, 'sFidel');
    default:
      return state;
  }
}
