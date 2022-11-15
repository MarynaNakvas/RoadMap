import { createAction } from 'redux-actions';

import { createConstants } from 'utils/actions';
import { MakePriorityPayload, SubmitDataPayload } from './table.model';

const typesNames = [
  'SET_INITIAL_STATE',

  'ENABLE_FETCH_DATA_LIST',
  'FETCH_DATA_LIST',
  
  'ENABLE_MAKE_PRIORITY',
  'MAKE_PRIORITY',

  'ENABLE_SUBMIT_DATA',
  'SUBMIT_DATA',

  'RESET_DATA_LIST',
] as const;

type Types = {
  [Key in typeof typesNames[number]]: string;
};

export const types = createConstants<Types>(typesNames);

const setInitialState = createAction(
  types.SET_INITIAL_STATE,
);

const enableFetchDataList = createAction(
  types.ENABLE_FETCH_DATA_LIST,
);
const fetchDataList = createAction(
  types.FETCH_DATA_LIST,
  null,
  () => ({
    auth: { enableFetch: enableFetchDataList },
  }),
);

const enableMakePriority = createAction(
  types.ENABLE_MAKE_PRIORITY,
);
const makePriority = createAction(
  types.MAKE_PRIORITY,
  (payload: MakePriorityPayload) => payload,
  () => ({
    auth: { enableFetch: enableMakePriority },
  }),
);

const enableSubmitData = createAction(
  types.ENABLE_SUBMIT_DATA,
);
const submitData = createAction(
  types.SUBMIT_DATA,
  (payload: SubmitDataPayload) => payload,
  () => ({
    auth: { enableFetch: enableSubmitData },
  }),
);

const resetDataList = createAction(
  types.RESET_DATA_LIST,
);

export const actions = {
  setInitialState,
  fetchDataList,
  makePriority,
  submitData,
  resetDataList,
} as const;

export default actions;
