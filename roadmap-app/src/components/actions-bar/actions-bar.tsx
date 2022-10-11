import React, { ReactNode, memo, useMemo, useRef } from 'react';
import { useIntersection } from 'react-use';
import { AppBar, Toolbar } from '@material-ui/core';
import classNames from 'clsx';

import './actions-bar.scss';

interface ActionsBarProps {
  isSticky?: boolean;
  className?: string;
  children: ReactNode;
}

const intersectionOptions = {} as IntersectionObserverInit;

const ActionsBar: React.FunctionComponent<ActionsBarProps> = memo((
  props,
) => {
    const { children, isSticky = false, className } = props;
    const ref = useRef(null);
    const intersection = useIntersection(ref, intersectionOptions);
    const hasIntersection = useMemo(
      () => intersection && intersection?.intersectionRatio < 1,
      [intersection],
    );

    return (
      <>
        <AppBar
          position={isSticky ? 'sticky' : 'static'}
          color={
            isSticky && hasIntersection ? 'inherit' : 'transparent'
          }
          className={classNames(className, 'actions-bar')}
        >
          <Toolbar disableGutters>{children}</Toolbar>
        </AppBar>
        <b ref={ref} />
      </>
    );
  },
);

ActionsBar.displayName = 'ActionsBar';

export default ActionsBar;
