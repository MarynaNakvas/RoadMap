import { ActionMeta } from 'redux-actions';
import { put, fork, call, takeLatest } from 'redux-saga/effects';
import { createApiCall } from 'services/api-service';
import { AppMeta, rejectedAction, resolvedAction } from 'utils';
import { types as actionsTypes } from './roadmap-actions';

/*
 * Sagas
 */

function* fetchDataListHandler({ meta }: ActionMeta<any, AppMeta>) {
  try {
    const { requestOptions } = meta;
    const options = {
      method: 'GET',
      ...requestOptions,
    };

    const url = 'https://mockend.com/org/repo/posts';
    const dataList = yield call(createApiCall, url, options);

    return yield put(
      resolvedAction(actionsTypes.FETCH_DATA_LIST, dataList),
    );
  } catch (error) {
    yield put(rejectedAction(actionsTypes.FETCH_DATA_LIST, null));
  }
}

/*
 * Watchers
 */

function* fetchDataListWatcher() {
  yield takeLatest(
    actionsTypes.FETCH_DATA_LIST,
    fetchDataListHandler,
  );
}

export default [fork(fetchDataListWatcher)];
