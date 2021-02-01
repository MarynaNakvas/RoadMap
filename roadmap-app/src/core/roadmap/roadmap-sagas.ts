import { ActionMeta } from 'redux-actions';
import { put, fork, call, takeLatest } from 'redux-saga/effects';
import { createApiCall } from 'services/api-service';
import { rejectedAction, resolvedAction } from 'utils';
import { types as actionsTypes } from './roadmap-actions';
import { normalizeData } from './roadmap-service';
import { AppMeta } from './roadmap.model';

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

    const url =
      'https://roadmap-29e3e-default-rtdb.firebaseio.com/posts.json';
    // 'https://app.fakejson.com/q/ePNmHUee?token=Ao7nQtvP3G6muZKNI7fguQ';
    // 'https://mockend.com/marfuny51/RoadMap/posts';
    // 'https://my-json-server.typicode.com/marfuny51/RoadMap/posts';
    const response = yield call(createApiCall, url, options);
    console.log('response', response);

    const dataList = yield call(normalizeData, response);

    return yield put(
      resolvedAction(actionsTypes.FETCH_DATA_LIST, dataList),
    );
  } catch (error) {
    const { message } = error;
    yield put(
      rejectedAction(actionsTypes.FETCH_DATA_LIST, null, {
        message: message,
      }),
    );
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
