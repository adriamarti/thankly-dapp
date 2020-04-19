// Internal Dependencies
import {
  GET_COMPANY_REQUESTED
} from './action-types';

export const getCompanyRequested = (companyId) => ({
  type: GET_COMPANY_REQUESTED,
  companyId,
});

