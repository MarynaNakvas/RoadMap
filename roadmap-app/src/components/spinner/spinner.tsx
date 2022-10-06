import React, { ReactNode } from 'react';
import classNames from 'clsx';
import { CircularProgress } from '@material-ui/core';

import './spinner.scss';

interface SpinnerProps {
  isFetching?: boolean;
  circleSize?: number;
  className?: string;
  children?: ReactNode;
}
const Spinner: React.FunctionComponent<SpinnerProps> = ({
  children,
  isFetching,
  circleSize = 40,
  className,
}) =>
  isFetching ? (
    <div className={classNames('spinner', className)}>
      <CircularProgress size={circleSize} />
    </div>
  ) : (
    <>{children}</>
  );

Spinner.displayName = 'Spinner';

export default Spinner;
