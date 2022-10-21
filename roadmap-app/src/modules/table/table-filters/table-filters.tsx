import React, { memo } from 'react';

import { FilterWithDatePicker } from 'components/date-picker';
import { FilterWithTermSearch } from 'components/term-filter';
import { FilterProps } from 'utils/filtering';

import './table-filters.scss';

interface TableFiltersProps {
  title: FilterProps<string>;
  author: FilterProps<string>;
  date: FilterProps<Date>;
  rating: FilterProps<number>;
}

const TableFilters: React.FunctionComponent<TableFiltersProps> = memo(
  ({ title, author, date, rating }) => (
    <div className="table-filters">
      <div className="table-filters__column">
        <FilterWithTermSearch filter={title} placeholder="Search" />
      </div>

      <div className="table-filters__column">
        <FilterWithTermSearch filter={author} placeholder="Search" />
      </div>

      <div className="table-filters__column">
        <FilterWithDatePicker filter={date} />
      </div>

      <div className="table-filters__column">
        <FilterWithTermSearch filter={rating} placeholder="Search" />
      </div>

      <div className="table-filters__column table-filters__actions" />

      <div className="table-filters__column table-filters__actions" />
    </div>
  ),
);

TableFilters.displayName = 'TableFilters';

export default TableFilters;
