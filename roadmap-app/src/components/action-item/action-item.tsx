import React, { memo } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import classNames from 'clsx';

import './action-item.scss';

const defaultPopperProps = {
  modifiers: {
    flip: {
      enabled: false,
    },
    preventOverflow: {
      escapeWithReference: true,
    },
  },
};

export interface ActionItemProps {
  icon?: JSX.Element;
  onClick?(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void;
  tooltip: string;
}

const ActionItem: React.FunctionComponent<ActionItemProps> = memo(
  ({ icon, onClick, tooltip }) => {
    const classes = {
      popper: classNames('tooltip'),
    };
    return icon ? (
      <Tooltip
        title={tooltip}
        placement="top"
        PopperProps={defaultPopperProps}
        classes={classes}
      >
        <IconButton onClick={onClick} className="action-item">
          <span className={classNames('action-item__icon')}>
            {icon}
          </span>
        </IconButton>
      </Tooltip>
    ) : null;
  },
);

ActionItem.displayName = 'ActionItem';

export default ActionItem;
