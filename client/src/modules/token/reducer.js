// External Dependencies
import update from 'immutability-helper';

// Internal Dependencies
import {
  GET_TOKEN_SUCCEEDED,
} from './action-types';

const initialState = {};

export function setToken(state, { data }) {
  return update(state, { $set: data });
}

export default function tokenReducer(state = initialState, action) {
  switch (action && action.type) {
    case GET_TOKEN_SUCCEEDED:
      return setToken(state, action);
    default:
      return state;
  }
}
