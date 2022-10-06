import React, {
  FunctionComponent,
  ReactElement,
  memo,
  useMemo,
} from 'react';
import {
  Tooltip as RawTooltip,
  TooltipProps as RawTooltipProps,
} from '@material-ui/core';
import classNames from 'clsx';

import './tooltip.scss';

interface UpdatedTooltipProps {
  className?: string;
  title?: RawTooltipProps['title'] | null;
  placement?: RawTooltipProps['placement'];
  children: ReactElement<any, any>;
}

type TooltipProps = UpdatedTooltipProps &
  Omit<RawTooltipProps, keyof UpdatedTooltipProps>;

const Tooltip: FunctionComponent<TooltipProps> = memo(
  ({
    className,
    title,
    placement = 'top',
    children,
    ...otherProps
  }) => {
    const classes = useMemo(
      () => ({
        popper: classNames(className, 'tooltip'),
      }),
      [className],
    );

    if (!title) {
      return children;
    }

    return (
      <RawTooltip
        classes={classes}
        title={title}
        placement={placement}
        {...otherProps}
      >
        {children}
      </RawTooltip>
    );
  },
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
