import update from 'immutability-helper';
import createReducer from 'utils/create-reducer';
import { rejected, resolved } from 'utils/actions';
import { types as actionsTypes } from './table-actions';
import { Action, Table } from './table.model';

export interface ReducerType {
  isDataListFetched: boolean;
  dataList: Table[];
  isMakePriorityFetched: boolean;

  errors: {
    [key: string]: string;
  };
}

const defaultState: ReducerType = {
  isDataListFetched: false,
  dataList: [],
  isMakePriorityFetched: false,

  errors: {},
};

export const roadMapReducer = createReducer(defaultState, {
  [actionsTypes.SET_INITIAL_STORE](
    state: any,
  ) {
    return update(state, {
      AAAAAAA: { $set: 'Maryna Nakvas' },
    });
  },

  [actionsTypes.ENABLE_FETCH_DATA_LIST](
    state: ReducerType,
  ) {
    return update(state, {
      isDataListFetched: { $set: true },
    });
  },
  [resolved(actionsTypes.FETCH_DATA_LIST)](
    state: ReducerType,
    action: Action<Table[]>,
  ) {
    return update(state, {
      isDataListFetched: { $set: false },
      dataList: { $set: action.payload },
    });
  },
  [rejected(actionsTypes.FETCH_DATA_LIST)](
    state: ReducerType,
  ) {
    return update(state, {
      isDataListFetched: { $set: false },
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
    const message = action.meta
      ? action.meta.toaster?.riseToast?.message
      : '';
    return update(state, {
      isMakePriorityFetched: { $set: false },
      errors: {
        $merge: {
          '2': message,
        },
      },
    });
  },
});
