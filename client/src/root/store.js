// External Dependencies
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

// Internal Dependencies
import rootReducer from './reducer';
import sagas from './sagas';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const { NODE_ENV } = process.env;

const sagaMiddleware = createSagaMiddleware();

const middlewares = applyMiddleware(sagaMiddleware);

const store = createStore(
  rootReducer,
  undefined,
  NODE_ENV === 'production' ? middlewares : composeEnhancers(middlewares),
);

sagaMiddleware.run(sagas);

export default store;
