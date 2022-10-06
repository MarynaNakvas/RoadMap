import React, { FunctionComponent, ReactNode, memo } from 'react';
import { ToastContainer } from 'react-toastify';
import clsx from 'clsx';

import './actions-with-toaster.scss';

// We may use simple container for wrapping actions with toaster.
// This container includes common required styles.

interface ActionsWithToasterProps {
  autoCloseTimeout?: number;
  containerId?: string;
  className?: string;
  children: ReactNode;
}

const ActionsWithToaster: FunctionComponent<ActionsWithToasterProps> =
  memo(
    ({
      autoCloseTimeout = 2000,
      containerId = 'COMMON_ACTIONS_CONTAINER_ID',
      className,
      children,
    }) => (
      <div className={clsx('actions-with-toaster', className)}>
        {children}

        <ToastContainer
          containerId={containerId}
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
