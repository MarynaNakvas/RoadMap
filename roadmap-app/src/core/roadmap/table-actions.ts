import { createAction } from 'redux-actions';
import { createConstants } from 'utils/actions';

const typesNames = [
  'ENABLE_FETCH_DATA_LIST',
  'FETCH_DATA_LIST',
  'MAKE_PRIORITY',
  'SET_INITIAL_STORE',
] as const;

type Types = {
  [Key in typeof typesNames[number]]: string;
};

export const types = createConstants<Types>(typesNames);

const setInitialStore = createAction(
  types.SET_INITIAL_STORE,
  null,
  () => ({}),
);

const enableFetchDataList = createAction(
  types.ENABLE_FETCH_DATA_LIST,
);
const fetchDataList = createAction(
  types.FETCH_DATA_LIST,
  (payload: any) => payload,
  () => ({
    auth: { enableFetch: enableFetchDataList },
  }),
);

const makePriority = createAction(
  types.MAKE_PRIORITY,
  (payload: any) => payload,
  () => ({}),
);

export const actions = {
  setInitialStore,
  fetchDataList,
  makePriority,
} as const;

export default actions;
