import { createSelector } from 'reselect';

import { InitialState } from './table.model';

export interface StateType {
  roadMap: InitialState;
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
  getIsPriorityMaking,
  getIsDataSubmitting,
};
