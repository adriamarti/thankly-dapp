// External Dependencies
import { combineReducers } from 'redux';

// Internal Dependencies: Modules
import user from './signIn/reducer';
import token from './token/reducer';
import ethereum from './ethereum/reducer';
import registration from './signUp/reducer';

export default combineReducers({
  user,
  token,
  ethereum,
  registration,
});
