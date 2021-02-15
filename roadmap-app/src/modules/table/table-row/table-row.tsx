import React, { useMemo } from 'react';
import classNames from 'clsx';
import CheckBox from 'components/checkbox';
import { FormikProps } from 'formik';
import { TableKeys } from 'core/roadmap';

import './table-row.scss';

interface TextCell {
  id: string;
  data?: string | number | Date | JSX.Element;
  className?: string;
}

interface TableRowProps {
  rowData: any;
  addPriority(props: string): void;
  formik: FormikProps<any>;
  styles?: any;
}

const TableRow = ({
  rowData,
  addPriority,
  formik,
  styles,
}: TableRowProps) => {
  const cells = useMemo(() => {
    const {
      [TableKeys.id]: id,
      [TableKeys.Title]: title,
      [TableKeys.Author]: author,
      [TableKeys.Date]: date,
      [TableKeys.Raiting]: raiting,
    } = rowData;

    const name = `${id}.${TableKeys.isPriority}`;

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

    const actionCell = {
      id: TableKeys.Action,
      data: (
        <CheckBox
          className="table-row__item-action"
          name={name}
          formik={formik}
          addPriority={addPriority}
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
        // style={styles}
      >
        {data}
      </div>
    ));
  }, [rowData, formik]);

  return <div className="table-row">{cells}</div>;
};

TableRow.displayName = 'TableRow';

export default TableRow;
