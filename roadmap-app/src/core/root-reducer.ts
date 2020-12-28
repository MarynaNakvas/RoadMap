import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import { roadMapReducer } from './roadmap';

export default (history: History): any =>
  combineReducers({
    // router: connectRouter(history),
    ...roadMapReducer,
  });
