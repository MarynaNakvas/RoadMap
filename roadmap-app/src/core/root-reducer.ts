import { combineReducers } from 'redux';
import { History } from 'history';

import { roadMapReducer } from './roadmap';

export default (history: History): any =>
  combineReducers({
    roadMap: roadMapReducer,
  });
