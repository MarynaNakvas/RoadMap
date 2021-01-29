import update from 'immutability-helper';
import { createReducer } from 'redux-create-reducer';
import { rejected, resolved } from 'utils';
import { types as actionsTypes } from './roadmap-actions';
import { Action, TableKeysType } from './roadmap.model';

export interface ReducerType {
  errors: {
    [key: string]: string;
  };
  isDataListFetched: boolean;
  dataList: TableKeysType[];
}

const defaultState: ReducerType = {
  errors: {},
  isDataListFetched: false,
  dataList: [],
};

export const roadMapReducer = createReducer(defaultState, {
  [actionsTypes.ENABLE_FETCH_DATA_LIST](state: ReducerType) {
    return update(state, {
      isDataListFetched: { $set: true },
      dataList: { $set: [] },
    });
  },

  [actionsTypes.FETCH_DATA_LIST](state: ReducerType) {
    return update(state, {
      isDataListFetched: { $set: true },
      dataList: { $set: [] },
    });
  },

  [resolved(actionsTypes.FETCH_DATA_LIST)](
    state: ReducerType,
    action: Action<TableKeysType[]>,
  ) {
    const payload = action.payload ? action.payload : [];
    return update(state, {
      isDataListFetched: { $set: false },
      dataList: { $set: payload },
    });
  },

  [rejected(actionsTypes.FETCH_DATA_LIST)](
    state: ReducerType,
    action: Action<TableKeysType[]>,
  ) {
    const message = action.meta ? action.meta.message : '';
    return update(state, {
      isDataListFetched: { $set: false },
      errors: {
        $merge: {
          [message]: message,
        },
      },
    });
  },
});
