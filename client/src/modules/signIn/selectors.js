export const getUser = (state) => state.modules.user || {};
export const getUserId = (state) => getUser(state)._id || '';
export const getUserTransactions = (state) => getUser(state).transactions || [];
