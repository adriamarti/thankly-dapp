export const getBasicState = (state) => state.modules.workers || {};
export const getWorkers = (state) => getBasicState(state).workers || [];
export const getInactiveWorkers = (state) => getBasicState(state).inactive || 0;
export const getActiveWorkers = (state) => getBasicState(state).active || 0;

