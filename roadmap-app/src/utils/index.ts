import { Reducer } from 'redux';
import { ActionMeta, createAction } from 'redux-actions';

export interface Action<T> {
  type: string;
  payload: T;
}

export const resolved = (type: string) => `${type}_SUCCESS`;

export const rejected = (type: string) => `${type}_ERROR`;

export const createConstants = <T>(
  constants: readonly any[],
  constantType?: string,
): T =>
  constants.reduce((acc, constant: string) => {
    const prefix = constantType ? `${constantType}/` : '';

    acc[constant] = `${prefix}${constant}`;

    return acc;
  }, {});

export const createReducer = <S>(
  initialState: S,
  handlers: any,
): Reducer<S> => {
  const reducer = (state: S = initialState, action: Action<S>): S => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };

  return reducer as Reducer<S>;
};

export interface AppMeta {
  message: string;
  auth?: {
    enableFetch?(payload?: any): ActionMeta<any, any>;
  };
  requestOptions?: RequestInit;
}

export const resolvedAction = (
  type: string,
  payload?: any,
  meta?: AppMeta | null,
) =>
  createAction(
    resolved(type),
    (payloadData) => payloadData,
    () => ({ ...meta }),
  )(payload);

export const rejectedAction = (
  type: string,
  payload?: any,
  meta?: AppMeta | null,
) =>
  createAction(
    rejected(type),
    (payloadData) => payloadData,
    () => ({ ...meta }),
  )(payload);
