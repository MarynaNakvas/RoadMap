import React, { memo } from 'react';

import { TableKeys, SortingProps } from 'core/roadmap/table.model';
import SortingButton from 'components/sorting-button';

import './table-header.scss';


const HEADINGS = [
  {
    id: TableKeys.title,
    title: 'Title',
  },
  {
    id: TableKeys.author,
    title: 'Author',
  },
  {
    id: TableKeys.date,
    title: 'Date',
  },
  {
    id: TableKeys.rating,
    title: 'Rating',
  },
];

interface TableHeaderProps {
  sortingRules: SortingProps;
  changeSortingRules(id: string): void;
}

const TableHeader: React.FunctionComponent<TableHeaderProps> =
  memo(({ sortingRules, changeSortingRules }) => (
    <div className="table-header">
      {HEADINGS.map(({ id, title }) => (
        <div key={id}>
          <SortingButton
            key={id}
            id={id}
            title={title}
            sortingRules={sortingRules}
            changeSortingRules={changeSortingRules}
          />
        </div>
      ))}

      <span className="table-header__action">
        Actions
      </span>
    </div>
  ));

TableHeader.displayName = 'TableHeader';

export default TableHeader;

