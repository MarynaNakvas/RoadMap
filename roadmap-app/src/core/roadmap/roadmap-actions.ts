import { createAction } from 'redux-actions';
import { createConstants } from 'utils';

const typesNames = ['FETCH_DATA_LIST', 'MAKE_PRIORITY'] as const;

type Types = {
  [Key in typeof typesNames[number]]: string;
};

export const types = createConstants<Types>(typesNames);

const fetchDataList = createAction(
  types.FETCH_DATA_LIST,
  (payload: any) => payload,
  () => ({}),
);

const makePriority = createAction(
  types.MAKE_PRIORITY,
  (payload: any) => payload,
  () => ({}),
);

export const actions = {
  fetchDataList,
  makePriority,
} as const;

export default actions;
