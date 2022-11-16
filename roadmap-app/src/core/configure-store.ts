import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';

import { createCustomMiddleWare } from 'core/roadmap';
import rootSaga from './root-saga';
import rootReducer from './root-reducer';
import { CustomStore, AsyncReducers, AsyncSagas } from './root.model';

export const history = createBrowserHistory();

const dev = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();
const customMiddleWare = createCustomMiddleWare();
let middleware = applyMiddleware(customMiddleWare, sagaMiddleware);

if (dev) {
  middleware = composeWithDevTools(middleware);
}

const configureStore = (extraReducers = {}) => {
  const store: CustomStore = createStore(
    rootReducer(extraReducers), middleware,
  );

  store.asyncReducers = {};
  store.injectReducer = (asyncReducers: AsyncReducers) => {
    Object.keys(asyncReducers).forEach(key => {
      if (store.asyncReducers && !store.asyncReducers[key]) {
        store.asyncReducers[key] = asyncReducers[key]
      }
    })
    store.replaceReducer(rootReducer(store.asyncReducers))
  }

  const createSagaInjector = (runSaga: (saga: () => Generator<any, void, any>) => Task)=> {
    const injectedSagas: AsyncSagas = {}
  
    const injectSaga = (key: string, saga: () => Generator<any, void, any>) => {
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
  const rootTask = store.injectSaga && store.injectSaga('root', rootSaga);

  const asyncTasks = Object.entries(extraReducers)
    .filter(([storeSlice]: any) => !!storeSlice.saga)
    .map(([key, storeSlice]: any) => store.injectSaga && store.injectSaga(key, storeSlice.saga))

  return {
    store,
    runSaga: [rootTask, ...asyncTasks],
  }
}

export default configureStore;
