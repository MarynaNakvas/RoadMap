import { ToastReasonType, AppMeta } from 'utils/actions';

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
