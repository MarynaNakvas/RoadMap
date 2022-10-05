import React, { memo } from 'react';
import { FormikProps } from 'formik';
import { get } from 'lodash';

import FormField from 'components/formik/field';
import CheckBox from 'components/checkbox';
import { TableKeys, Table } from 'core/roadmap';

import './table-row.scss';

interface TableRowProps {
  formik: FormikProps<Table[]>;
  item: Table;
  remove(originIndex: number): void;
}

const TableRow: React.FunctionComponent<TableRowProps> =
  memo(
    ({
      formik,
      item,
      remove,
    }) => {
      const originIndex = get(item, TableKeys.originIndex);

      return (
        <div className="table-row">
          <div className="table-row__column">
            <FormField
              formik={formik}
              name={`${originIndex}.${TableKeys.title}`}
              placeholder="Title"
              fullWidth
            />
          </div>

          <div className="table-row__column">
            <FormField
              formik={formik}
              name={`${originIndex}.${TableKeys.author}`}
              placeholder="Author"
              fullWidth
            />
          </div>

          <div className="table-row__column">
            <FormField
              formik={formik}
              name={`${originIndex}.${TableKeys.date}`}
              placeholder="Date"
              fullWidth
            />
          </div>

          <div className="table-row__column">
            <FormField
              formik={formik}
              name={`${originIndex}.${TableKeys.rating}`}
              placeholder="Rating"
              fullWidth
            />
          </div>

          <div className="table-row__column">
            <CheckBox
              formik={formik}
              name={`${originIndex}.${TableKeys.isPriority}`}
              className="table-row__item-action"
            />
          </div>

          <button type="button" onClick={() => remove(originIndex)}>
            {/* {icon} */}
            <span>Delete</span>
          </button>
        </div>
      );
    },
  );

TableRow.displayName = 'TableRow';

export default TableRow;

