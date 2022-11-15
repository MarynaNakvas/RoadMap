import { Store } from 'redux';
import { Task } from 'redux-saga';

export interface State {
  roadMap: {}; 
}

export interface AsyncReducers {
  [key: string]: (state: any) => void;
}

export interface AsyncSagas {
  [key: string]: Task;
}

export interface CustomStore extends Store {
  asyncReducers?: AsyncReducers;
  injectReducer?: (props: AsyncReducers) => void;
  injectSaga?: (key: string, saga: () => Generator<any, void, any>) => Task;
}
