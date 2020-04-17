export const getRegistration = (state) => state.modules.registration || {};
export const getRegistrationName = (state) => getRegistration(state).name || null;
