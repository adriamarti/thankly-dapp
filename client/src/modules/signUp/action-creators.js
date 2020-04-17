// Internal Dependencies
import {
  SIGN_UP_COMPANY_REQUESTED,
} from './action-types';

export const signUpCompanyRequested = (email, name, password, ethereumAddress) => ({
  type: SIGN_UP_COMPANY_REQUESTED,
  email,
  name,
  password,
  ethereumAddress,
});