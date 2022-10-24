import { Dispatch, Unsubscribe, AnyAction, Reducer, CombinedState } from 'redux';

export interface State {
  roadMap: {}; 
}

export interface Store {
  dispatch: Dispatch<AnyAction>;
  getState(): State;
  subscribe(listener: () => void): Unsubscribe;
  replaceReducer(nextReducer: Reducer<State, AnyAction>): void;
}

export interface CustomStore extends CombinedState<Store> {
  asyncReducers: any;
  injectReducer: any;
  injectSaga: any;
}
