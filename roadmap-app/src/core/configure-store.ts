import createSagaMiddleware from 'redux-saga';
import * as localforage from 'localforage';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import roadMapSaga from './root-saga';
import roadMapReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  version: 1,
  storage: localforage,
  stateReconciler: autoMergeLevel2,
};

export const history = createBrowserHistory();

const enchanters = [sagaMiddleware];

const middleware = applyMiddleware(...enchanters);

const persistedReducer = persistReducer(
  persistConfig,
  roadMapReducer(history),
);

export default () => {
  const store = createStore(persistedReducer, middleware);
  const persistor = persistStore(store);
  return {
    store,
    persistor,
    runSaga: sagaMiddleware.run(roadMapSaga),
  };
};
