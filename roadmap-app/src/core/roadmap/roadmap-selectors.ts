import { createSelector } from 'reselect';

const getLocalState = (state: any) => state;

const getDataList = createSelector(
  getLocalState,
  ({ dataList }) => dataList,
);

const getIsDataListFetched = createSelector(
  getLocalState,
  ({ isDataListFetched }) => isDataListFetched,
);

export default {
  getLocalState,
  getDataList,
  getIsDataListFetched,
};
