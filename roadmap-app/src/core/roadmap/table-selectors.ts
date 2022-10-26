import { createSelector } from 'reselect';

import { ReducerType } from './table-reducer';

export interface StateType {
  roadMap: ReducerType;
}

const getLocalState = (state: StateType) => state.roadMap;

const getDataList = createSelector(
  getLocalState,
  ({ dataList }) => dataList,
);

const getData = createSelector(
  getDataList,
  ( dataList ) => ({dataList}),
);

const getIsDataListFetching = createSelector(
  getLocalState,
  ({ isDataListFetching }) => isDataListFetching,
);

const getErrors = createSelector(
  getLocalState,
  ({ errors }) => errors,
);

const getIsPriorityMaking = createSelector(
  getLocalState,
  ({ isPriorityMaking }) => isPriorityMaking,
);

const getIsDataSubmitting = createSelector(
  getLocalState,
  ({ isDataSubmitting }) => isDataSubmitting,
);

export default {
  getDataList,
  getData,
  getIsDataListFetching,
  getErrors,
  getIsPriorityMaking,
  getIsDataSubmitting,
};
