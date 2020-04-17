// Internal Dependencies
import {
  GET_TOKEN_REQUESTED,
} from './action-types';

export const getTokenRequested = (companyAddress) => ({
  type: GET_TOKEN_REQUESTED,
  companyAddress,
});