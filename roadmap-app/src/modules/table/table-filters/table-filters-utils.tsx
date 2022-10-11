import React, { useMemo } from 'react';
import { get } from 'lodash';

import { TableKeys, Table } from 'core/roadmap/table.model';
import {
  FiltersOptions,
  useFilter,
  useHasFilters,
  useResetFilters,
} from 'utils/filtering';

export const getFiltersOptions = (
  data: Table[],
) => {
  const filtersOptions = new FiltersOptions([
    TableKeys.title,
    TableKeys.author,
    TableKeys.rating,
  ]);

  data.forEach((item) => {
    const rating = get(item, TableKeys.rating);

    filtersOptions.add(
      TableKeys.title,
      get(item, TableKeys.title),
    );

    filtersOptions.add(
      TableKeys.author,
      get(item, TableKeys.author),
    );

    filtersOptions.add(
      TableKeys.rating,
      rating ? rating.toString() : '',
    );
  });

  return filtersOptions.getOptions();
};

export const useFiltering = (
  data: Table[],
) => {
  const [
    titleOptions,
    authorOptions,
    ratingOptions,
  ] = useMemo(
    () => getFiltersOptions(data),
    [data],
  );

  const title = useFilter<string>(undefined, titleOptions);
  const author = useFilter<string>(undefined, authorOptions);
  const rating = useFilter<number>(undefined, ratingOptions);

  const filters = [title, author, rating];

  return {
    title,
    author,
    rating,
    hasFilters: useHasFilters(filters),
    resetFilters: useResetFilters(filters),
  };
};
