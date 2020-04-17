// External Dependencies
import update from 'immutability-helper';

// Internal Dependencies
import {
  SIGN_IN_SUCCEEDED,
} from './action-types';

const initialState = {};

export function setUser(state, { data }) {
  return update(state, { $set: data });
}

export default function signInReducer(state = initialState, action) {
  switch (action && action.type) {
    case SIGN_IN_SUCCEEDED:
      return setUser(state, action);
    default:
      return state;
  }
}
