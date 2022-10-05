import { useCallback, useMemo, useState } from 'react';
import { get } from 'lodash';

import {
  numberCompareFunction,
  stringCompareFunction,
} from 'utils/sorting';

export interface OptionProps {
  label: string;
  value: any;
  selectAll?: boolean;
  purpose?: string;
  sortOrder?: number;
}

export type SortingForFilterOptions = (
  left: OptionProps,
  right: OptionProps,
) => number;

export interface SortingMapForFilterOptions {
  [key: string]: SortingForFilterOptions | undefined;
}

const sortDataByLabel: SortingForFilterOptions = (
  left: OptionProps,
  right: OptionProps,
) => {
  // Select all data should be first in the list.
  const selectAllResult = numberCompareFunction({
    left: left.selectAll ? 1 : 0,
    right: right.selectAll ? 1 : 0,
    isReversed: true,
  });
  if (selectAllResult !== 0) {
    return selectAllResult;
  }

  // Items with special purpose should be the next items in the list.
  const purposeResult = stringCompareFunction({
    left: left.purpose,
    right: right.purpose,
  });
  if (purposeResult !== 0) {
    return purposeResult;
  }

  // Items with the sortOrder field should be sort by this value.
  const sortOrderResult = numberCompareFunction({
    left: left.sortOrder,
    right: right.sortOrder,
  });
  if (sortOrderResult !== 0) {
    return sortOrderResult;
  }

  // Sorting using label by default.
  return stringCompareFunction({
    left: left.label,
    right: right.label,
  });
};

interface FiltersOptionsData {
  [key: string]: {
    set: Set<any>;
    options: OptionProps[];
  };
}

class FiltersOptions {
  datas: FiltersOptionsData;

  constructor(keys: string[]) {
    this.datas = keys.reduce(
      (result, key) => ({
        ...result,
        [key]: {
          set: new Set<any>(),
          options: [],
        },
      }),
      {},
    );
  }

  add(
    key: string,
    label: string,
    targetValue?: any,
    otherData: any = {},
  ) {
    const data = this.datas[key];

    const value =
      targetValue === false
        ? false
        : targetValue != null
        ? targetValue
        : label;
    if (data && !data.set.has(value)) {
      data.set.add(value);
      data.options.push({
        label: label,
        value,
        ...otherData,
      });
    }
  }

  addOptions(key: string, options: OptionProps[]) {
    const data = this.datas[key];
    if (data) {
      options.forEach((option) => {
        const { value } = option;
        if (!data.set.has(value)) {
          data.set.add(value);
          data.options.push(option);
        }
      });
    }
  }

  // We may quickly set all options instead of adding each option one by one.
  setOptions(key: string, options: OptionProps[]) {
    const data = this.datas[key];
    if (data) {
      data.set = new Set<any>(options);
      data.options = options;
    }
  }

  getOptions(sortingMap?: SortingMapForFilterOptions) {
    return Object.keys(this.datas).map((key) => {
      const options = this.datas[key].options.slice();
      const sorting = get(sortingMap, key, sortDataByLabel);
      return options.sort(sorting);
    });
  }
}

export { FiltersOptions };

export interface FilterBasicProps<ValueType> {
  value: ValueType;
  label: string;
}

export interface FilterProps<ValueType> {
  value: ValueType | undefined | null;
  label: string;
  option: OptionProps | undefined | null;
  setOption(props: OptionProps | undefined | null): void;
  options: OptionProps[];
}

export const getFilterLabel = (value: any, label?: string | null) =>
  label != null ? label : value != null ? `${value}` : '';

export const useFilterProps = <ValueType>(
  filter: OptionProps | undefined | null,
  setFilter: (props: OptionProps | undefined | null) => void,
  options?: OptionProps[] | null,
) => {
  const data = useMemo(() => {
    const value = get(filter, 'value');
    const label = get(filter, 'label');
    return {
      value,
      label: getFilterLabel(value, label),
      option: filter,
      setOption: setFilter,
    };
  }, [filter, setFilter]);
  return useMemo(
    () =>
      ({ ...data, options: options || [] } as FilterProps<ValueType>),
    [data, options],
  );
};

export const useFilter = <ValueType>(
  defaultProps: FilterBasicProps<ValueType> | undefined | null,
  options?: OptionProps[] | null,
) => {
  const [filter, setFilter] = useState<
    OptionProps | undefined | null
  >(defaultProps);
  return useFilterProps<ValueType>(filter, setFilter, options);
};

export const useHasFilters = (
  filters: (FilterProps<any>)[],
) =>
  useMemo(
    () => filters.some((filter) => get(filter, 'value') != null),
    [filters.map((filter) => get(filter, 'value'))],
  );

export const useResetFilters = (
  filters: (FilterProps<any>)[],
) =>
  useCallback(() => {
    filters.forEach((filter) => get(filter, 'setOption')(undefined));
  }, [filters.map((filter) => get(filter, 'setOption'))]);
