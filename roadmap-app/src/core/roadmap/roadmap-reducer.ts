import update from 'immutability-helper';
import { ActionMeta } from 'redux-actions';

import {
  Action,
  AppMeta,
  createReducer,
  rejected,
  resolved,
} from 'utils';
import { types as actionsTypes } from './roadmap-actions';
import { TableKeysType } from './roadmap.model';

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

export const roadMapReducer = createReducer<ReducerType>(
  defaultState,
  {
    [actionsTypes.ENABLE_FETCH_DATA_LIST](state: ReducerType) {
      return update(state, {
        isDataListFetched: { $set: true },
        dataList: { $set: [] },
      });
    },
    [resolved(actionsTypes.FETCH_DATA_LIST)](
      state: ReducerType,
      { payload: dataList }: Action<any[]>,
    ) {
      return update(state, {
        isDataListFetched: { $set: false },
        dataList: { $set: dataList },
      });
    },
    [rejected(actionsTypes.FETCH_DATA_LIST)](
      state: ReducerType,
      { meta }: ActionMeta<any, AppMeta>,
    ) {
      return update(state, {
        isDataListFetched: { $set: false },
        errors: {
          $merge: {
            [meta.message]: meta.message,
          },
        },
      });
    },
  },
);
