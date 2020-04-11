// External Dependencies
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

// Internal Dependencies
import requestsStatuses from './requests/reducer';
// import pages from '../containers/reducer';
import modules from '../modules/reducer';

export default combineReducers({
  // HTTP requests
  requestsStatuses,
  // redux-form
  form,
  // Pages
  // pages,
  // Modules
  modules,
});
