import { createAction, Action, ActionMeta } from 'redux-actions';

export const resolved = (type: string) => `${type}_SUCCESS`;

export const rejected = (type: string) => `${type}_ERROR`;

export enum ToastReasonType {
  Success = 'success',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

export interface AppMeta {
  toaster?: {
    riseToast?: {
      containerId: string;
      message: string;
      reason?: ToastReasonType;
      scrollToTop?: boolean;
      needToDismissPrevious?: boolean;
    };
    dismissToast?: string;
  };
  modalConductorAction?: Action<any>;
  auth?: {
    enableFetch?(payload?: any): ActionMeta<any, any>;
  };
  requestOptions?: RequestInit;
  toastKey?: string;
  toastId?: string;
}

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
