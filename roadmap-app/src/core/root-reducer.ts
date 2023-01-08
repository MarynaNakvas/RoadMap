import { combineReducers } from 'redux';

import { roadMapReducer } from './roadmap';

export const rootReducer = (asyncReducers = {}) => combineReducers({
  roadMap: roadMapReducer,
  ...asyncReducers,
});

export default rootReducer;
