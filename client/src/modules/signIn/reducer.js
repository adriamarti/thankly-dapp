// External Dependencies
import update from 'immutability-helper';

// Internal Dependencies
import {
  SIGN_IN_SUCCEEDED,
  ADD_PATHWAY_SUCCEEDED,
} from './action-types';

const initialState = {};

export function setUser(state, { data }) {
  return update(state, { $set: data });
}

export function setPatwhays(state, { pathways }) {
  return update(state, {
    pathways: { $push: pathways },
  });
}

export default function signInReducer(state = initialState, action) {
  switch (action && action.type) {
    case SIGN_IN_SUCCEEDED:
      return setUser(state, action);
    case ADD_PATHWAY_SUCCEEDED:
      return setPatwhays(state, action);
    default:
      return state;
  }
}
