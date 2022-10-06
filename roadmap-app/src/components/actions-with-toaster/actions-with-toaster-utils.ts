import { ToastReasonType, AppMeta } from 'utils/actions';

// By default toast for action will be placed into common container.
// Previous toast will be dismissed.

export const createMetaWithToast = (
  message: string,
  reason: ToastReasonType = ToastReasonType.Success,
  containerId: string = 'COMMON_ACTIONS_CONTAINER_ID',
  needToDismissPrevious = true,
  scrollToTop = false,
): AppMeta => ({
  toaster: {
    riseToast: {
      message,
      reason,
      containerId,
      scrollToTop,
      needToDismissPrevious,
    },
  },
});
