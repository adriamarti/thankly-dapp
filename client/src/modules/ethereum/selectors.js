export const getEthereum = (state) => state.modules.ethereum || {};
export const getSelectedAddress = (state) => getEthereum(state).selectedAddress || null;
export const getSmartContractInstance = (state) => getEthereum(state).smartContractInstance || null