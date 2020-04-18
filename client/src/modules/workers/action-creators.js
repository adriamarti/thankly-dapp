// Internal Dependencies
import {
  GET_WORKERS_REQUESTED,
  REGISTER_WORKERS_REQUESTED,
} from './action-types';

export const getWorkersRequested = (companyId) => ({
  type: GET_WORKERS_REQUESTED,
  companyId,
});

export const registerWorkersRequested = (companyId, email, name, pathwayId, contract, address) => ({
  type: REGISTER_WORKERS_REQUESTED,
  companyId,
  email,
  name,
  pathwayId,
  contract,
  address,
});