// Internal Dependencies
import {
  SIGN_IN_REQUESTED,
} from './action-types';

export const signInRequested = (email, password, typeOfUser) => ({
  type: SIGN_IN_REQUESTED,
  email,
  password,
  typeOfUser,
});