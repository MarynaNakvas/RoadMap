import {
  AnyAction,
  CombinedState,
  Reducer,
  combineReducers,
} from 'redux';

import {
  Action,
  ReducerType,
  roadMapReducer,
  TableKeysType,
} from './roadmap';

interface StateReducerProps {
  state: ReducerType;
  action: Action<TableKeysType[]>;
}

export const rootReducers = combineReducers({
  roadMap: roadMapReducer,
});

// export type RootState = ReturnType<typeof rootReducers>
