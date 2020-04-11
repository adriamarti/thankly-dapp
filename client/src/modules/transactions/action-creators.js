// Internal Dependencies
import {
  GET_FIDEL_TRANSACTIONS_REQUESTED,
  GET_S_FIDEL_TRANSACTIONS_REQUESTED,
} from './action-types';

export const getFidelTransactionsRequested = () => ({
  type: GET_FIDEL_TRANSACTIONS_REQUESTED,
});

export const getSFidelTransactionsRequested = () => ({
  type: GET_S_FIDEL_TRANSACTIONS_REQUESTED,
});
