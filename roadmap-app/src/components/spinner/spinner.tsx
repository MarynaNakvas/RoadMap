import React, { memo, ReactNode } from 'react';
import { CircularProgress } from '@material-ui/core';

import './spinner.scss';

interface SpinnerProps {
  isFetching?: boolean;
  circleSize?: number;
  children?: ReactNode;
}
const Spinner: React.FunctionComponent<SpinnerProps> = memo(
  ({ children, isFetching, circleSize = 40 }) =>
    isFetching ? (
      <div className="spinner">
        <CircularProgress size={circleSize} />
      </div>
    ) : (
      <>{children}</>
    ),
);

Spinner.displayName = 'Spinner';

export default Spinner;
