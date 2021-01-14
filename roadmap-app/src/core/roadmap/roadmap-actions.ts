import { createAction } from 'redux-actions';
import { createConstants } from 'utils';

const typesNames = [
  'ENABLE_FETCH_DATA_LIST',
  'FETCH_DATA_LIST',
] as const;

type Types = {
  [Key in typeof typesNames[number]]: string;
};

export const types = createConstants<Types>(typesNames);

const enableFetchDataList = createAction(
  types.ENABLE_FETCH_DATA_LIST,
);

const fetchDataList = createAction(
  types.FETCH_DATA_LIST,
  (payload: any) => payload,
  () => ({ isDataListFetched: enableFetchDataList }),
);

export const actions = {
  enableFetchDataList,
  fetchDataList,
} as const;

export default actions;
