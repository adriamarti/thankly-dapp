// External Dependencies
import { combineReducers } from 'redux';

// Internal Dependencies: Modules
import transactions from './transactions/reducer';

export default combineReducers({
  transactions,
});
