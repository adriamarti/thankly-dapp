// External Dependencies
import update from 'immutability-helper';

// Internal Dependencies
import {
  SIGN_IN_SUCCEEDED,
  ADD_PATHWAY_SUCCEEDED,
} from './action-types';

import {
  SEND_TOKENS_SUCCEEDED,
} from '../workers/action-types';

const initialState = {};

export function setUser(state, { data }) {
  return update(state, { $set: data });
}

export function setPatwhays(state, { pathways }) {
  return update(state, {
    pathways: { $push: pathways },
  });
}

export function addTransaction(state, { transactions }) {
  return update(state, {
    transactions: { $push: [transactions] },
  });
}

export default function signInReducer(state = initialState, action) {
  switch (action && action.type) {
    case SIGN_IN_SUCCEEDED:
      return setUser(state, action);
    case ADD_PATHWAY_SUCCEEDED:
      return setPatwhays(state, action);
    case SEND_TOKENS_SUCCEEDED:
      return addTransaction(state, action);
    default:
      return state;
  }
}
