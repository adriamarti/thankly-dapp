// Internal Dependencies
import {
  GET_WORKERS_REQUESTED,
  REGISTER_WORKERS_REQUESTED,
  ADD_TRANSACTION_REQUESTED,
  SEND_TOKENS_REQUESTED,
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

export const addTransactionRequested = (transactions) => ({
  type: ADD_TRANSACTION_REQUESTED,
  transactions,
});

export const sendTokensRequested = (payload) => ({
  type: SEND_TOKENS_REQUESTED,
  payload,
});