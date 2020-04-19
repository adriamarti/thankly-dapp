export const getUser = (state) => state.modules.user || {};
export const getUserId = (state) => getUser(state)._id || '';
export const getUserTransactions = (state) => getUser(state).transactions || [];
export const getPathways = (state) => getUser(state).pathways || [];
export const getCompanyId = (state) => getUser(state).companyId || [];
