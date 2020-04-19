// Internal Dependencies
import {
  GET_TOKEN_REQUESTED,
} from './action-types';

export const getTokenRequested = (contract, address, workerId) => ({
  type: GET_TOKEN_REQUESTED,
  contract,
  address,
  workerId,
});