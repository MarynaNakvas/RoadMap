import { AppMeta } from 'core/roadmap';
import { createAction } from 'redux-actions';

export const resolved = (type: string) => `${type}_SUCCESS`;

export const rejected = (type: string) => `${type}_ERROR`;

export const createConstants = <T>(constants: readonly any[]): T =>
  constants.reduce((acc, constant: string) => {
    acc[constant] = `${constant}`;
    return acc;
  }, {} as T);

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
