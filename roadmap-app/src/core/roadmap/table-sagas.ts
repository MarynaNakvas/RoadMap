import { ActionMeta } from 'redux-actions';
import { put, fork, call, takeLatest, all } from 'redux-saga/effects';
import { differenceBy } from 'lodash';

import { createApiCall } from 'services/api-service';
import { resolvedAction, AppMeta } from 'utils/actions';
import { types as actionsTypes } from './table-actions';
import { normalizeData } from './table-service';
import { putError } from './table-utils';

import { tableActions } from '.';

/*
 * Sagas
 */

function* fetchDataListHandler({
  type,
  meta,
}: ActionMeta<any, AppMeta>) {
  try {
    const { requestOptions } = meta;
    const options = {
      method: 'GET',
      ...requestOptions,
    };

    const url =
      'https://road-map-241b4-default-rtdb.europe-west1.firebasedatabase.app/posts.json';

    const response = yield call(createApiCall, url, options);

    const dataList = yield call(normalizeData, response);

    return yield put(
      resolvedAction(type, dataList),
    );
  } catch (error) {
    yield putError(error as Error, type);
  }
}

function* makePriorityHandler({
  type,
  payload,
  meta,
}: ActionMeta<any, AppMeta>) {
  try {
    const { requestOptions } = meta;
    const { values, initialValues } = payload;
    const array = differenceBy(values, initialValues);

    const response = yield all([
      ...array.map((item: any) =>
        call(
          createApiCall,
          `https://road-map-241b4-default-rtdb.europe-west1.firebasedatabase.app/posts/${item.id}/.json`,
          {
            method: 'PATCH',
            body: JSON.stringify(item),
            ...requestOptions,
          },
        ),
      ),
    ]);
    return yield all([
      put(resolvedAction(type, response)),
      // put(tableActions.fetchDataList()),
    ]);
  } catch (error) {
    yield putError(error as Error, type);
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

function* makePriorityWatcher() {
  yield takeLatest(actionsTypes.MAKE_PRIORITY, makePriorityHandler);
}

export default [
  fork(fetchDataListWatcher),
  fork(makePriorityWatcher),
];
