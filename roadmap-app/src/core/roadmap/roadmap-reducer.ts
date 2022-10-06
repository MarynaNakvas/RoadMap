import update from 'immutability-helper';
import { createReducer } from 'redux-create-reducer';
import { rejected, resolved } from 'utils/actions';
import { types as actionsTypes } from './roadmap-actions';
import { Action, Table } from './roadmap.model';

export interface ReducerType {
  errors: {
    [key: string]: string;
  };
  isDataListFetched: boolean;
  dataList: Table[];
  isMakePriorityFetched: boolean;
}

const defaultState: ReducerType = {
  errors: {},
  isDataListFetched: false,
  dataList: [],
  isMakePriorityFetched: false,
};

export const roadMapReducer = createReducer(defaultState, {
  [actionsTypes.FETCH_DATA_LIST](state: ReducerType) {
    return update(state, {
      isDataListFetched: { $set: true },
      dataList: { $set: [] },
    });
  },

  [resolved(actionsTypes.FETCH_DATA_LIST)](
    state: ReducerType,
    action: Action<Table[]>,
  ) {
    const payload = action.payload ? action.payload : [];
    return update(state, {
      isDataListFetched: { $set: false },
      dataList: { $set: payload },
    });
  },

  [rejected(actionsTypes.FETCH_DATA_LIST)](
    state: ReducerType,
    action: Action<Table[]>,
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

  [actionsTypes.MAKE_PRIORITY](state: ReducerType) {
    return update(state, {
      isMakePriorityFetched: { $set: true },
    });
  },

  [resolved(actionsTypes.MAKE_PRIORITY)](state: ReducerType) {
    return update(state, {
      isMakePriorityFetched: { $set: false },
    });
  },

  [rejected(actionsTypes.MAKE_PRIORITY)](
    state: ReducerType,
    action: Action<Table[]>,
  ) {
    const message = action.meta ? action.meta.message : '';
    return update(state, {
      isMakePriorityFetched: { $set: false },
      errors: {
        $merge: {
          [message]: message,
        },
      },
    });
  },
});
