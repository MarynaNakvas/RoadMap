import React from 'react';

import './loading-indicator.scss';

interface LoadingIndicatorProps {}

const LoadingIndicator: React.FunctionComponent<
  LoadingIndicatorProps
> = () => (
  <div className="loading-indicator">
    <span className="loading-indicator__dot" />
    <span className="loading-indicator__dot" />
    <span className="loading-indicator__dot" />
  </div>
);

LoadingIndicator.displayName = 'LoadingIndicator';

export default LoadingIndicator;
