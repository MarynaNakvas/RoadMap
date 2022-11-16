import { CSSProperties } from 'react';
import { InputActionMeta } from 'react-select';
import { AppMeta } from 'utils/actions';

export type AutoSizerType = {
  width: number;
  height: number;
};

export type VariableSizeListType = {
  index: number;
  style: CSSProperties;
};

export interface Action<T> {
  type: string;
  payload: T;
  meta?: AppMeta;
}

export enum TableKeys {
  id = 'id',
  title = 'title',
  author = 'author',
  date = 'date',
  rating = 'rating',
  action = 'action',
  isPriority = 'isPriority',
  key = 'key',
  originIndex = 'originIndex',
}

export interface Table {
  [TableKeys.id]?: string | null;
  [TableKeys.title]: string;
  [TableKeys.author]: string;
  [TableKeys.date]: string;
  [TableKeys.rating]: number | null;
  [TableKeys.isPriority]: boolean;
  [TableKeys.key]: string | number | null;
  [TableKeys.originIndex]: number;
}

export interface TableData {
  dataList: Table[];
}

export interface MakePriorityPayload {
  id?: string | number | null;
  isPriority: boolean;
}

export interface SubmitDataPayload {
  values: Table[];
  initialValues: Table[];
}

export interface SortingProps {
  id: number | string;
  isReversed?: boolean;
}

export interface OptionProps {
  value: any;
  label: string;
}

export interface OnSearchProps {
  term: string;
  meta: InputActionMeta;
}
