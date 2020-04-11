import { fork } from 'redux-saga/effects';

// Pages
// import company from '../containers/company/sagas';

// Modules
import transactions from '../modules/transactions/sagas';

export default function* sagas() {
  // Pages
  // yield fork(company);
  // Modules
  yield fork(transactions);
}