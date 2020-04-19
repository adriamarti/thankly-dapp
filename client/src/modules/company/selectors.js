export const getBasicState = (state) => state.modules.company || {};
export const getAddress = (state) => getBasicState(state).ethereumAddress || '';
export const getName = (state) => getBasicState(state).name || '';
export const getEmail = (state) => getBasicState(state).email || '';
export const getId = (state) => getBasicState(state)._id || '';
export const getCompanyPathways = (state) => getBasicState(state).pathways || [];

