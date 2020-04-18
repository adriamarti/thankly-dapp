// Internal Dependencies
import {
  SIGN_IN_REQUESTED,
  ADD_PATHWAY_REQUESTED,
} from './action-types';

export const signInRequested = (email, password, typeOfUser) => ({
  type: SIGN_IN_REQUESTED,
  email,
  password,
  typeOfUser,
});

export const addPathwayRequested = (companyId, name, amount) => ({
  type: ADD_PATHWAY_REQUESTED,
  companyId,
  name,
  amount,
});