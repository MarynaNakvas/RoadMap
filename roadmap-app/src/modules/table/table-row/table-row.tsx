import React, { useMemo } from 'react';
import classNames from 'clsx';
import { Checkbox } from '@material-ui/core';
import { TableKeys } from 'core/roadmap';
import { dateFormat } from 'utils/date-formater';

import './table-row.scss';

interface TextCell {
  id: string;
  data?: string | number;
  className?: string;
}

interface TableRowProps {
  rowData: any;
  addPriority(props: number): void;
}

const TableRow = ({ rowData, addPriority }: TableRowProps) => {
  const cells = useMemo(() => {
    const {
      [TableKeys.id]: id,
      [TableKeys.Title]: title,
      [TableKeys.Author]: author,
      [TableKeys.Date]: date,
      [TableKeys.Raiting]: raiting,
    } = rowData;

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
      data: date,
    };
    const raitingCell = {
      id: TableKeys.Raiting,
      data: raiting,
    };

    const toggleSelected = () => {
      addPriority(id);
    };

    const actionCell = {
      id: TableKeys.Action,
      data: (
        <Checkbox
          className="table-row__item-action"
          onClick={toggleSelected}
        />
      ),
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
