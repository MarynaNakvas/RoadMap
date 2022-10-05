import React, { useCallback, useMemo, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { compareAsc, compareDesc } from 'date-fns';

const defaultOptions = {
  numeric: true,
  sensitivity: 'base',
  ignorePunctuation: true,
};

export type StringComparatorOptions = typeof defaultOptions;

export interface StringCompareFunctionProps {
  left?: string;
  right?: string;
  isReversed?: boolean;
  options?: StringComparatorOptions;
}

export interface NumberCompareFunctionProps {
  left?: number;
  right?: number;
  isReversed?: boolean;
}

export interface DateCompareFunctionProps {
  left?: Date;
  right?: Date;
  isReversed?: boolean;
}

export const stringCompareFunction = ({
  left,
  right,
  isReversed,
  options = defaultOptions,
}: StringCompareFunctionProps): number => {
  if (!left && !right) {
    return 0;
  }
  if (!left) {
    return isReversed ? -1 : 1;
  }
  if (!right) {
    return isReversed ? 1 : -1;
  }
  const trimmedLeft = left.toString().trim().toLowerCase();
  const trimmedRight = right.toString().trim().toLowerCase();
  const result = trimmedLeft.localeCompare(
    trimmedRight,
    'en',
    options,
  );

  return isReversed ? result * -1 : result;
};

export const numberCompareFunction = ({
  left,
  right,
  isReversed,
}: NumberCompareFunctionProps): number => {
  if (left == null && right == null) {
    return 0;
  }
  if (left == null) {
    return isReversed ? -1 : 1;
  }
  if (right == null) {
    return isReversed ? 1 : -1;
  }
  return isReversed ? right - left : left - right;
};

export const dateCompareFunction = ({
  left,
  right,
  isReversed,
}: DateCompareFunctionProps): number => {
  if (left == null && right == null) {
    return 0;
  }
  if (left == null) {
    return isReversed ? -1 : 1;
  }
  if (right == null) {
    return isReversed ? 1 : -1;
  }
  return isReversed
    ? compareDesc(left, right)
    : compareAsc(left, right);
};

export const useSorting = (
  defaultSortBy?: string | null,
  isDefaultSortingReversed?: boolean | null,
) => {
  const [sortBy, setSortBy] = useState<string>(defaultSortBy || '');
  const [isSortingReversed, setIsSortingReversed] = useState(
    isDefaultSortingReversed || false,
  );
  useUpdateEffect(
    () => setSortBy(defaultSortBy || ''),
    [setSortBy, defaultSortBy],
  );
  const sortingRules = useMemo(
    () => ({
      id: sortBy,
      isReversed: isSortingReversed,
    }),
    [sortBy, isSortingReversed],
  );
  const changeSortingRules = useCallback(
    (value: string) => {
      if (value === sortBy) {
        setIsSortingReversed((isReversed) => !isReversed);
      } else {
        setIsSortingReversed(false);
        setSortBy(value);
      }
    },
    [sortBy, setSortBy, setIsSortingReversed],
  );
  const resetSortingRules = useCallback(() => {
    setSortBy(defaultSortBy || '');
    setIsSortingReversed(isDefaultSortingReversed || false);
  }, [
    setSortBy,
    defaultSortBy,
    setIsSortingReversed,
    isDefaultSortingReversed,
  ]);
  return {
    sortingRules,
    changeSortingRules,
    resetSortingRules,
  };
};
