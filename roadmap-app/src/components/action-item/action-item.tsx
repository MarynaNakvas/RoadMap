import React, {
  FunctionComponent,
  RefObject,
  memo,
  forwardRef,
} from 'react';
import { IconButton, PopperProps, Tooltip } from '@material-ui/core';
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
  ref?: RefObject<any>;
  id?: string;
  icon?: JSX.Element;
  onClick?(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void;
  disabled?: boolean;
  tooltip: string;
  className?: string;
  popperProps?: PopperProps;
}

const ActionItem: FunctionComponent<ActionItemProps> = memo(
  forwardRef<HTMLDivElement, ActionItemProps>(
    (
      {
        id,
        icon,
        onClick,
        tooltip,
        disabled,
        className,
        popperProps = defaultPopperProps,
      },
      ref,
    ) => {
      const classes = {
        popper: classNames('tooltip'),
      };
      return icon ? (
        <Tooltip
          ref={ref}
          title={disabled ? '' : tooltip}
          placement="top"
          disableFocusListener={disabled}
          disableHoverListener={disabled}
          disableTouchListener={disabled}
          PopperProps={popperProps}
          classes={classes}
        >
          <IconButton
            disabled={disabled}
            onClick={disabled ? () => null : onClick}
            className={classNames('action-item', {
              [`action-item-${id}`]: id,
            })}
          >
            <span
              className={classNames('action-item__icon', className)}
            >
              {icon}
            </span>
          </IconButton>
        </Tooltip>
      ) : null;
    },
  ),
);

ActionItem.displayName = 'ActionItem';

export default ActionItem;
