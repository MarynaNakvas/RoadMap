import { all } from 'redux-saga/effects';

import { tableSagas } from './roadmap';

export default function* startForman() {
  yield all([...tableSagas]);
}
