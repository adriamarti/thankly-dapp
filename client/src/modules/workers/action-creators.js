// Internal Dependencies
import {
  GET_WORKERS_REQUESTED,
} from './action-types';

export const getWorkersRequested = (companyId) => ({
  type: GET_WORKERS_REQUESTED,
  companyId,
});