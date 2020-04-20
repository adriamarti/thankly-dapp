// External Dependencies
import update from 'immutability-helper';

// Internal Dependencies
import {
  GET_TOKEN_SUCCEEDED,
} from './action-types';

import {
  SEND_TOKENS_SUCCEEDED,
} from '../workers/action-types';

const initialState = {};

export function setToken(state, { data }) {
  return update(state, { $set: data });
}

export function updateBalance(state, { transactions }) {
  const amountToReduce = +transactions.amount
  const total = +state.balance.transferableTokens
  return update(state, {
    balance: { 
      transferableTokens: { $set: `${total - amountToReduce}`}
    },
  });
}

export default function tokenReducer(state = initialState, action) {
  switch (action && action.type) {
    case GET_TOKEN_SUCCEEDED:
      return setToken(state, action);
    case SEND_TOKENS_SUCCEEDED:
      return updateBalance(state, action);
    default:
      return state;
  }
}
