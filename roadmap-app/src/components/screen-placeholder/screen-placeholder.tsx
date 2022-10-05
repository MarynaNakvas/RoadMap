import React from 'react';

import { Typography } from '@material-ui/core';

import './screen-placeholder.scss';

export interface ScreenPlaceholderProps {
  title?: string;
  description?: string;
}

const ScreenPlaceholder: React.FunctionComponent<
  ScreenPlaceholderProps
> = ({ title, description, children }) => (
  <div className="screen-placeholder">
    {!!title && (
      <Typography className="screen-placeholder__title">
        {title}
      </Typography>
    )}

    {!!description && (
      <Typography className="screen-placeholder__description">
        {description}
      </Typography>
    )}
    {children}
  </div>
);

ScreenPlaceholder.displayName = 'ScreenPlaceholder';

export default ScreenPlaceholder;
