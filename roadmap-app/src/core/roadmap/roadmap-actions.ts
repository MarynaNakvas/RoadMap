import { createAction } from 'redux-actions';
import { createConstants } from 'utils';

const typesNames = [
  'ENABLE_FETCH_DATA_LIST',
  'FETCH_DATA_LIST',
  'ENABLE_MAKE_PRIORITY',
  'MAKE_PRIORITY',
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

const enableMakePriority = createAction(types.ENABLE_MAKE_PRIORITY);

const makePriority = createAction(
  types.MAKE_PRIORITY,
  (payload: any) => payload,
  () => ({ isMakePriorityFetched: enableMakePriority }),
);

export const actions = {
  enableFetchDataList,
  fetchDataList,
  enableMakePriority,
  makePriority,
} as const;

export default actions;
