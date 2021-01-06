import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'clsx';

import { roadMapSelectors, TableKeys } from 'core/roadmap';
import { dateFormat } from 'utils/date-formater';

import './table-row.scss';

interface TextCell {
  id: string;
  data?: string | number;
  className?: string;
}

interface TableRowProps {
  rowData: any;
}

const TableRow = ({ rowData }: TableRowProps) => {
  const cells = useMemo(() => {
    const {
      [TableKeys.id]: id,
      [TableKeys.Title]: title,
      [TableKeys.Author]: author,
      [TableKeys.Date]: date,
      [TableKeys.Raiting]: raiting,
    } = rowData;

    const action = <input type="checkbox" />;

    const titleCell = {
      id: TableKeys.Title,
      data: title,
    };
    const authorCell = {
      id: TableKeys.Author,
      data: author,
    };
    const dateCell = {
      id: TableKeys.Date,
      data: dateFormat(new Date(date)),
    };
    const raitingCell = {
      id: TableKeys.Raiting,
      data: raiting,
    };
    const actionCell = {
      id: TableKeys.Action,
      data: action,
    };

    const tableCells = [
      titleCell,
      authorCell,
      dateCell,
      raitingCell,
      actionCell,
    ];

    return tableCells.map(({ id, data, className }: TextCell) => (
      <div
        key={id}
        className={classNames('table-row__item', { className })}
      >
        {data}
      </div>
    ));
  }, [rowData]);

  return <div className="table-row">{cells}</div>;
};

TableRow.displayName = 'TableRow';

export default TableRow;
