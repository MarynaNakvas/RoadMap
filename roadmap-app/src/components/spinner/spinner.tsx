import React from 'react';
import { CircularProgress } from '@material-ui/core';

import './spinner.scss';

interface SpinnerProps {
  isFetching: boolean;
}
const Spinner: React.FunctionComponent<SpinnerProps> = ({
  children,
  isFetching,
}) =>
  isFetching ? (
    <div className="spinner">
      <CircularProgress size={32} />
    </div>
  ) : (
    <>{children}</>
  );

Spinner.displayName = 'Spinner';

export default Spinner;
