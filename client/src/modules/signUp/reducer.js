// External Dependencies
import update from 'immutability-helper';

// Internal Dependencies
import {
  SIGN_UP_COMPANY_SUCCEEDED,
} from './action-types';

const initialState = {};

export function setRegister(state, { data }) {
  return update(state, { $set: data });
}

export default function signUpReducer(state = initialState, action) {
  switch (action && action.type) {
    case SIGN_UP_COMPANY_SUCCEEDED:
      return setRegister(state, action);
    default:
      return state;
  }
}
