export const getBaseState = (state) => state.modules.transactions || {};
export const getFidelTransactions = (state) => getBaseState(state).fidel || [];
export const getSFidelTransactions = (state) => getBaseState(state).sFidel || [];
