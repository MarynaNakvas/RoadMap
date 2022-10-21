import { Reducer } from 'redux';

import { Action } from 'core/roadmap/table.model';

const createReducer = <S>(
  initialState: S,
  handlers: any,
): Reducer<S> => {
  const reducer = (state: S = initialState, action: Action<S>): S => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };

  return reducer as Reducer<S>;
};

export default createReducer;
