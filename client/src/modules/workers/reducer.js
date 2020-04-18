// External Dependencies
import update from 'immutability-helper';

// Internal Dependencies
import {
  GET_WORKERS_SUCCEEDED,
} from './action-types';

const initialState = {};

export function setWorkers(state, { data }) {
  return update(state, { $set: data });
}

export default function workersReducer(state = initialState, action) {
  switch (action && action.type) {
    case GET_WORKERS_SUCCEEDED:
      return setWorkers(state, action);
    default:
      return state;
  }
}
