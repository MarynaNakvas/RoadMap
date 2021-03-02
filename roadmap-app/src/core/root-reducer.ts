import { combineReducers } from 'redux';

import { roadMapReducer } from './roadmap';

export const rootReducers = combineReducers({
  roadMap: roadMapReducer,
});
