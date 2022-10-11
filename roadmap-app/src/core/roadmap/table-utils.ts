import { put } from 'redux-saga/effects';

import { rejectedAction } from 'utils/actions';

export function* putError(
  error: Error,
  baseType: string,
  payload?: any,
) {
  yield put(
    rejectedAction(baseType, payload, {
      toaster: {
        riseToast: {
          containerId: 'COMMON_ACTIONS_CONTAINER_ID',
          message: error.message,
        },
      },
    }),
  );
}
