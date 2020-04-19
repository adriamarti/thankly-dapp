// External Dependencies
import update from 'immutability-helper';

// Internal Dependencies
import {
  GET_COMPANY_SUCCEEDED,
} from './action-types';

const initialState = {};

export function setCompany(state, { data }) {
  return update(state, { $set: data });
}

export default function companyReducer(state = initialState, action) {
  switch (action && action.type) {
    case GET_COMPANY_SUCCEEDED:
      return setCompany(state, action);
    default:
      return state;
  }
}