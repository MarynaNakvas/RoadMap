import { createSelector } from 'reselect';

const getLocalState = (state: any) => state.roadMap;

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

export default {
  getLocalState,
  getDataList,
  getIsDataListFetched,
  getErrors,
};
