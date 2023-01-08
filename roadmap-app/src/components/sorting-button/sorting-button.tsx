import React, { memo, useCallback } from 'react';
import clsx from 'clsx';

import { SortingProps } from 'core/roadmap';
import { ReactComponent as ArrowDownIcon } from 'assets/icons/arrow-sort.svg';

import './sorting-button.scss';

interface SortingButtonProps {
  id: string;
  title: string | JSX.Element;
  sortingRules?: SortingProps;
  changeSortingRules(id: string): void;
}

const SortingButton: React.FunctionComponent<SortingButtonProps> = memo(
  ({ id, title, sortingRules, changeSortingRules }) => {
    const isActive = sortingRules?.id === id;
    const isReversed = sortingRules?.isReversed;

    const onClick = useCallback(() => {
      changeSortingRules(id);
    }, [id, changeSortingRules]);

    return (
      <button
        className="sorting-button"
        onClick={onClick}
        type="button"
      >
        <span className="sorting-button__title">{title}</span>
        <ArrowDownIcon
          className={clsx(
            'sorting-button__icon',
            { 'sorting-button__icon--active': isActive },
            { 'sorting-button__icon--asc': isActive && !isReversed },
            { 'sorting-button__icon--desc': isActive && isReversed },
          )}
        />
      </button>
    );
  },
);

SortingButton.displayName = 'SortingButton';

export default SortingButton;
