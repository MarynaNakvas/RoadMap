import createSagaMiddleware from 'redux-saga';
import * as localforage from 'localforage';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootSaga from './root-saga';
import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  version: 1,
  storage: localforage,
  stateReconciler: autoMergeLevel2,
};

export const history = createBrowserHistory();

const dev = process.env.NODE_ENV === 'development';

let middleware = applyMiddleware(sagaMiddleware);

if (dev) {
  middleware = composeWithDevTools(middleware);
}

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer(history),
);

export default () => {
  const store = createStore(persistedReducer, middleware);
  const persistor = persistStore(store);
  return {
    store,
    persistor,
    runSaga: sagaMiddleware.run(rootSaga),
  };
};
