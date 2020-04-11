export const unfetched = 'UNFETCHED';

export const fetching = 'FETCHING';

export const successful = 'SUCCESSFUL';

export const failure = 'FAILURE';

export function requestIsDone(status) {
  return [successful, failure].includes(status);
}

export function requestIsFetching(status) {
  return fetching === status;
}

export function requestIsSuccessful(status) {
  return successful === status;
}

export function requestIsFailed(status) {
  return failure === status;
}
