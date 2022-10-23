import createSagaMiddleware from 'redux-saga';
// import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { persistReducer, persistStore } from 'redux-persist';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { createCustomMiddleWare } from 'core/roadmap';
import rootSaga from './root-saga';
import { rootReducers } from './root-reducer';

const sagaMiddleware = createSagaMiddleware();
const customMiddleWare = createCustomMiddleWare();

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage: storage,
//   stateReconciler: autoMergeLevel2,
// };

export const history = createBrowserHistory();

const dev = process.env.NODE_ENV === 'development';

let middleware = applyMiddleware(customMiddleWare, sagaMiddleware);

if (dev) {
  middleware = composeWithDevTools(middleware);
}

// const persistedReducer = persistReducer<any>(
//   persistConfig,
//   rootReducers,
// );

export default () => {
  const store = createStore(rootReducers, middleware);
  // const persistor = persistStore(store);
  return {
    store,
    // persistor,
    runSaga: sagaMiddleware.run(rootSaga),
  };
};
