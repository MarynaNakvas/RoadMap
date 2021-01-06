import React from 'react';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

import './table-filters.scss';

const TableFilters: React.FunctionComponent = () => (
  <div className="table-filters">
    <div className="table-filters__item">
      <SearchIcon />
    </div>
    <div className="table-filters__item">
      <SearchIcon />
    </div>
    <div className="table-filters__item">
      <SearchIcon />
    </div>
    <div className="table-filters__item">
      <SearchIcon />
    </div>
    <div className="table-filters__item" />
  </div>
);

TableFilters.displayName = 'TableFilters';

export default TableFilters;
