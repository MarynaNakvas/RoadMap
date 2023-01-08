import React, { memo, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { FormikProps } from 'formik';
import { get } from 'lodash';
import classNames from 'clsx';

import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as IconStar } from 'assets/icons/icon-star.svg';
import { tableActions, TableKeys, Table, TableData } from 'core/roadmap';
import FormField from 'components/formik/field';
import ActionItem from 'components/action-item';

import './table-row.scss';

interface TableRowProps {
  formik: FormikProps<TableData>;
  item: Table;
  remove(originIndex: number): void;
  isTouched: boolean;
}

const TableRow: React.FunctionComponent<TableRowProps> = memo(
  ({ formik, item, remove, isTouched }) => {
    const dispatch = useDispatch();

    const { originIndex, id, key, isPriority } = useMemo(() => ({
      originIndex: get(item, TableKeys.originIndex),
      id: get(item, TableKeys.id),
      key: get(item, TableKeys.key),
      isPriority: get(item, TableKeys.isPriority),
    }), [item]);

    const makePriority = useCallback(() =>
      dispatch(tableActions.makePriority({ id: key, isPriority: !isPriority })),
    [key, isPriority]);

    return (
      <>
        <div className="table-row__column">
          <FormField
            formik={formik}
            name={`dataList.${originIndex}.${TableKeys.title}`}
            fieldType="text"
            placeholder="Title"
            fullWidth
          />
        </div>

        <div className="table-row__column">
          <FormField
            formik={formik}
            name={`dataList.${originIndex}.${TableKeys.author}`}
            placeholder="Author"
            fullWidth
          />
        </div>

        <div className="table-row__column">
          <FormField
            formik={formik}
            name={`dataList.${originIndex}.${TableKeys.date}`}
            fieldType="datePicker"
            isFormView
          />
        </div>

        <div className="table-row__column">
          <FormField
            formik={formik}
            name={`dataList.${originIndex}.${TableKeys.rating}`}
            fieldType="numberField"
            placeholder="Rating"
            fullWidth
          />
        </div>

        <div
          className={classNames(
            'table-row__column',
            { 'table-row__column--priority': isPriority },
          )}
        >
          <ActionItem
            icon={<IconStar />}
            onClick={makePriority}
            tooltip="Make Priority"
            disabled={isTouched || !id}
          />
        </div>

        <div>
          {id &&
            <button
              className="table-row__column table-row__column-action"
              type="button"
              onClick={() => remove(originIndex)}
            >
              <DeleteIcon />
              <span>Delete</span>
            </button>
          }
        </div>
      </>
    );
  },
);

TableRow.displayName = 'TableRow';

export default TableRow;
