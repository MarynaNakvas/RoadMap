import update from 'immutability-helper';

import createReducer from 'utils/create-reducer';
import { rejected, resolved } from 'utils/actions';
import { types as actionsTypes } from './table-actions';
import { Action, Table } from './table.model';

export interface ReducerType {
  isDataListFetching: boolean;
  dataList: Table[];
  isPriorityMaking: boolean;
  isDataSubmitting: boolean;

  errors: {
    [key: string]: string;
  };
}

const defaultState: ReducerType = {
  isDataListFetching: false,
  dataList: [],
  isPriorityMaking: false,
  isDataSubmitting: false,

  errors: {},
};

export const roadMapReducer = createReducer(defaultState, {
  [actionsTypes.SET_INITIAL_STATE](
    state: any,
  ) {
    return update(state, {
      author: { $set: 'Maryna Nakvas' },
    });
  },

  [actionsTypes.ENABLE_FETCH_DATA_LIST](
    state: ReducerType,
  ) {
    return update(state, {
      isDataListFetching: { $set: true },
    });
  },
  [resolved(actionsTypes.FETCH_DATA_LIST)](
    state: ReducerType,
    action: Action<Table[]>,
  ) {
    return update(state, {
      isDataListFetching: { $set: false },
      dataList: { $set: action.payload },
    });
  },
  [rejected(actionsTypes.FETCH_DATA_LIST)](
    state: ReducerType,
  ) {
    return update(state, {
      isDataListFetching: { $set: false },
    });
  },

  [actionsTypes.ENABLE_MAKE_PRIORITY](state: ReducerType) {
    return update(state, {
      isPriorityMaking: { $set: true },
    });
  },
  [resolved(actionsTypes.MAKE_PRIORITY)](state: ReducerType) {
    return update(state, {
      isPriorityMaking: { $set: false },
    });
  },
  [rejected(actionsTypes.MAKE_PRIORITY)](
    state: ReducerType,
  ) {
    return update(state, {
      isPriorityMaking: { $set: false },
    });
  },

  [actionsTypes.ENABLE_SUBMIT_DATA](state: ReducerType) {
    return update(state, {
      isDataSubmitting: { $set: true },
    });
  },
  [resolved(actionsTypes.SUBMIT_DATA)](state: ReducerType) {
    return update(state, {
      isDataSubmitting: { $set: false },
    });
  },
  [rejected(actionsTypes.SUBMIT_DATA)](
    state: ReducerType,
  ) {
    return update(state, {
      isDataSubmitting: { $set: false },
    });
  },

  
  [actionsTypes.RESET_DATA_LIST](
    state: ReducerType,
  ) {
    return update(state, {
      dataList: { $set: [] },
    });
  },
});
