import { createSelector } from 'reselect';
import { ReducerType } from './roadmap-reducer';

export interface StateType {
  roadMap: ReducerType;
}

const getLocalState = (state: StateType) => state.roadMap;

const getDataList = createSelector(
  getLocalState,
  ({ dataList }) => dataList,
);

const getIsDataListFetched = createSelector(
  getLocalState,
  ({ isDataListFetched }) => isDataListFetched,
);

const getErrors = createSelector(
  getLocalState,
  ({ errors }) => errors,
);

const getIsMakePriorityFetched = createSelector(
  getLocalState,
  ({ isMakePriorityFetched }) => isMakePriorityFetched,
);

export default {
  getLocalState,
  getDataList,
  getIsDataListFetched,
  getErrors,
  getIsMakePriorityFetched,
};
