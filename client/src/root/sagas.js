import { fork } from 'redux-saga/effects';

// Pages
// import company from '../containers/company/sagas';

// Modules
import signIn from '../modules/signIn/sagas';
import ethereum from '../modules/ethereum/sagas';
import signUp from '../modules/signUp/sagas';

export default function* sagas() {
  // Pages
  // yield fork(company);
  // Modules
  yield fork(ethereum);
  yield fork(signUp);
  yield fork(signIn);
}