import { all } from 'redux-saga/effects';

import { roadMapSagas } from './roadmap';

export default function* startForman() {
  yield all([...roadMapSagas]);
}
