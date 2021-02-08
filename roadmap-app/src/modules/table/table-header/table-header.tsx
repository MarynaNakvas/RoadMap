import React from 'react';
import classNames from 'clsx';

import { TableKeys } from 'core/roadmap';
import { ReactComponent as SortingIcon } from 'assets/icons/arrow-sort.svg';
import { SotringRulesProps } from '../table.model';

import './table-header.scss';

interface TextHeading {
  id: string;
  title: string;
  dataKey: string;
  className?: string;
}

interface TableHeadersProps {
  sort(props: string): void;
  sortRules: SotringRulesProps;
}

const TableHeader = ({ sort, sortRules }: TableHeadersProps) => {
  const titleHeading = {
    id: TableKeys.Title,
    title: 'Title',
    dataKey: 'title',
  };
  const authorHeading = {
    id: TableKeys.Author,
    title: 'Author',
    dataKey: 'author',
  };
  const dateHeading = {
    id: TableKeys.Date,
    title: 'Date',
    dataKey: 'date',
  };
  const raitingHeading = {
    id: TableKeys.Raiting,
    title: 'Raiting',
    dataKey: 'raiting',
  };
  const emptyHeading = {
    id: TableKeys.Action,
    title: 'Priority',
    dataKey: 'action',
    className: 'table-headers__item-action',
  };

  const tableHeadings = [
    titleHeading,
    authorHeading,
    dateHeading,
    raitingHeading,
    emptyHeading,
  ];

  const headings = tableHeadings.map(
    ({ id, title, dataKey, className }: TextHeading) => {
      const isActiveSortingButton = dataKey === sortRules.dataKey;
      return id === 'action' ? (
        <div
          key={id}
          className={classNames('table-headers__item', className)}
        >
          {title}
        </div>
      ) : (
        <div
          key={id}
          className={classNames('table-headers__item', { className })}
          onClick={() => sort(dataKey)}
        >
          {title}
          <button
            key={id}
            className={classNames('sorting-button', {
              'sorting-button__active': isActiveSortingButton,
              'sorting-button__increase':
                isActiveSortingButton &&
                sortRules.direction === 'increase',
              'sorting-button__decrease':
                isActiveSortingButton &&
                sortRules.direction === 'decrease',
            })}
            onClick={() => sort(dataKey)}
          >
            <SortingIcon />
          </button>
        </div>
      );
    },
  );

  return <div className="table-headers">{headings}</div>;
};

TableHeader.displayName = 'TableHeader';

export default TableHeader;
