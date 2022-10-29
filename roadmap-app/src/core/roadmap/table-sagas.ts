import { ActionMeta } from 'redux-actions';
import { put, fork, call, takeLatest, all } from 'redux-saga/effects';
import { get } from 'lodash';

import { createApiCall } from 'services/api-service';
import { resolvedAction, AppMeta } from 'utils/actions';
import { types as actionsTypes } from './table-actions';
import { normalizeData, serializeEntriesForSubmit } from './table-service';
import { MakePriorityPayload, SubmitDataPayload, TableKeys } from './table.model';
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

    const dataList = yield call(normalizeData, Object.entries(response));

    return yield put(
      resolvedAction(type, dataList),
    );
  } catch (error) {
    yield putError(error as Error, type);
  }
}

function* makePriorityHandler({
  type,
  payload: { id, isPriority },
  meta,
}: ActionMeta<MakePriorityPayload, AppMeta>) {
  try {
    const { requestOptions } = meta;
    yield call(
      createApiCall,
      `https://road-map-241b4-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}/.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({isPriority}),
        ...requestOptions,
      },
    );
    return yield all([
      put(resolvedAction(type, isPriority)),
      put(tableActions.fetchDataList()),
    ]);
  } catch (error) {
    yield putError(error as Error, type);
  }
}

function* submitDataHandler({
  type,
  payload: { values, initialValues },
  meta,
}: ActionMeta<SubmitDataPayload, AppMeta>): Generator<
  any,
  void,
  any
> {
  try {
    const { requestOptions } = meta;

    const {
      added: addedEntries,
      updated: updatedEntries,
      removed: removedEntries,
    } = serializeEntriesForSubmit(
      values,
      initialValues,
    );

    const addedEntriesCalls =
      addedEntries.map((entry, index) => {
        const key = values.length - (1 + index);
        return createApiCall(
          `https://road-map-241b4-default-rtdb.europe-west1.firebasedatabase.app/posts/${key}/.json`, {
          method: 'PATCH',
          ...requestOptions,
          body: JSON.stringify(entry),
        })
      });

    const updatedEntriesCalls =
      updatedEntries.map((entry) => {
        const updatedEntry = initialValues.find((item) => item.id === entry.id);
        const key = get(updatedEntry, TableKeys.key);
         
        return createApiCall(
          `https://road-map-241b4-default-rtdb.europe-west1.firebasedatabase.app/posts/${key}/.json`, {
          method: 'PATCH',
          ...requestOptions,
          body: JSON.stringify(entry),
        })
      });

    const removedEntriesCalls =
      removedEntries.map((entry) => {
        const removedEntry = initialValues.find((item) => item.id === entry.id);
        const key = get(removedEntry, TableKeys.key);  
        return createApiCall(`https://road-map-241b4-default-rtdb.europe-west1.firebasedatabase.app/posts/${key}/.json`, {
          method: 'DELETE',
          ...requestOptions,
        })    
      });

    yield all([
      ...addedEntriesCalls,
      ...updatedEntriesCalls,
      ...removedEntriesCalls,
    ]);

    return yield all([
      put(resolvedAction(type, values)),
      put(tableActions.fetchDataList()),
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

function* submitDataWatcher() {
  yield takeLatest(actionsTypes.SUBMIT_DATA, submitDataHandler);
}

export default [
  fork(fetchDataListWatcher),
  fork(makePriorityWatcher),
  fork(submitDataWatcher),
];
