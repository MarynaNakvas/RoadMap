import React, { ReactNode, memo } from 'react';
import { ToastContainer } from 'react-toastify';

import './actions-with-toaster.scss';

interface ActionsWithToasterProps {
  autoCloseTimeout?: number;
  className?: string;
  children: ReactNode;
}

const ActionsWithToaster: React.FunctionComponent<ActionsWithToasterProps> = memo(
  ({ autoCloseTimeout = 2000, children }) => (
    <div className="actions-with-toaster">
      {children}

      <ToastContainer
        containerId="COMMON_ACTIONS_CONTAINER_ID"
        autoClose={autoCloseTimeout}
        closeButton={false}
        draggable={false}
        enableMultiContainer
        hideProgressBar
        limit={1}
        pauseOnHover={false}
      />
    </div>
  ),
);

ActionsWithToaster.displayName = 'ActionsWithToaster';

export default ActionsWithToaster;
