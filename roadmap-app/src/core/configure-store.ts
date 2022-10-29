import { applyMiddleware, createStore, MiddlewareAPI } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';

import { createCustomMiddleWare } from 'core/roadmap';
import rootSaga from './root-saga';
import rootReducer from './root-reducer';

export const history = createBrowserHistory();

const dev = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();
const customMiddleWare = createCustomMiddleWare();
let middleware = applyMiddleware(customMiddleWare, sagaMiddleware);

if (dev) {
  middleware = composeWithDevTools(middleware);
}

const configureStore = (extraReducers = {}) => {
  const store: MiddlewareAPI | any = createStore(
    rootReducer(extraReducers), middleware,
  );

  store.asyncReducers = {};
  store.injectReducer = (asyncReducers: any) => {
    Object.keys(asyncReducers).forEach(key => {
      if (!store.asyncReducers[key]) {
        store.asyncReducers[key] = asyncReducers[key]
      }
    })
    store.replaceReducer(rootReducer(store.asyncReducers))
  }

  const createSagaInjector = (runSaga: any) => {
    const injectedSagas: any = {}
  
    const injectSaga = (key: string, saga: any) => {
      if (injectedSagas[key]) {
        return injectedSagas[key];
      }
      
      const task = runSaga(saga);
      injectedSagas[key] = task;
    
      return task;
    }
  
    return injectSaga;
  }
  
  store.injectSaga = createSagaInjector(sagaMiddleware.run);
  const rootTask = store.injectSaga('root', rootSaga);

  const asyncTasks = Object.entries(extraReducers)
    .filter(([key, storeSlice]: any) => !!storeSlice.saga)
    .map(([key, storeSlice]: any) => store.injectSaga(key, storeSlice.saga))

  return {
    store,
    runSaga: [rootTask, ...asyncTasks],
  }
}

export default configureStore;
