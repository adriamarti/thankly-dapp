// External Dependencies
import update from 'immutability-helper';
import camelCase from 'camelcase';
import { omit } from 'lodash';
import { fetching, successful, failure } from './status';

// modules
import { SIGN_IN_REQUESTED} from '../../modules/signIn/action-types';

const monitoredRequests = [
  { action: SIGN_IN_REQUESTED },
].map((request) => (request.requestIdentifier ? request : { ...request, requestIdentifier: () => 'none' }));

const INITIAL_STATE = {};

const requestAttributeNames = monitoredRequests.map(({ action }) => camelCase(action.replace('_REQUESTED', '')));

function changeStateByIdentifier(requestName, identifier, status, payload) {
  return {
    [requestName]: {
      $set: {
        [identifier]: {
          status,
          payload,
        },
      },
    },
  };
}

export default function requestReducer(state = INITIAL_STATE, action) {
  if (action && action.type) {
    const ccAction = camelCase(action.type).replace('Requested', '');

    let attribute = null;

    if (!requestAttributeNames.length) {
      return state;
    } if (requestAttributeNames.length === 1) {
      attribute = requestAttributeNames.find((attr) => ccAction.indexOf(attr) === 0);
    } else {
      attribute = requestAttributeNames
        .sort((a, b) => b.length - a.length)
        .find((attr) => ccAction.indexOf(attr) === 0);
    }

    if (!attribute) {
      return state;
    }

    let status;
    const restAttr = ccAction.replace(attribute, '').toLowerCase();
    if (restAttr === '') {
      status = fetching;
    } else if (restAttr === 'succeeded') {
      status = successful;
    } else if (restAttr === 'failed') {
      status = failure;
    }

    const { requestIdentifier } = monitoredRequests.find((request) => camelCase(request.action) === `${attribute}Requested`);
    const identifier = requestIdentifier(action);
    return update(state, changeStateByIdentifier(attribute, identifier, status, action.payload || omit(action, 'type')));
  }
  return state;
}
