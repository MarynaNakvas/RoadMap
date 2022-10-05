import React, { memo, useCallback } from 'react';
import clsx from 'clsx';

import { SortingProps } from 'core/roadmap';
import { ReactComponent as ArrowDownIcon } from 'assets/icons/arrow-sort-down-small.svg';

import './sorting-button.scss';

interface SortingButtonProps {
  id: string;
  title: string | JSX.Element;
  sortingRules?: SortingProps;
  changeSortingRules(id: string): void;
  classNames?: string;
}

const SortingButton = memo(
  ({
    id,
    title,
    classNames,
    sortingRules,
    changeSortingRules,
  }: SortingButtonProps) => {
    const isActive = sortingRules?.id === id;
    const isReversed = sortingRules?.isReversed;

    const onClick = useCallback(() => {
      changeSortingRules(id);
    }, [id, changeSortingRules]);

    return (
      <button
        className={clsx('sorting-button', classNames)}
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
