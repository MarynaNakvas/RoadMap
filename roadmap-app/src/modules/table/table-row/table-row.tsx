import React, { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikProps } from 'formik';
import { get } from 'lodash';
import classNames from 'clsx';

import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as IconStar } from 'assets/icons/icon-star.svg';
import { tableActions, tableSelectors, TableKeys, Table, TableData } from 'core/roadmap';
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

    const isPriorityMaking = useSelector(
      tableSelectors.getIsPriorityMaking,
    );

    const { originIndex, id, isPriority } = useMemo(() => ({
      originIndex: get(item, TableKeys.originIndex),
      id: get(item, TableKeys.id),
      isPriority: get(item, TableKeys.isPriority),
    }), [item]);

    const makePriority = useCallback(() =>
      dispatch(tableActions.makePriority({ id: originIndex, isPriority: !isPriority })),
    [originIndex, isPriority]);

    return (
      <>
        <div className="table-row__column">
          <FormField
            formik={formik}
            name={`dataList.${originIndex}.${TableKeys.title}`}
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
          {/* <FormField
            formik={formik}
            name={`${originIndex}.${TableKeys.isPriority}`}
            fieldType="checkbox"
            icon={<IconStar />}
            checkedIcon={<IconStar />}
            fullWidth
          /> */}
        </div>

        {id ? <button
          className="table-row__column table-row__column-action"
          type="button"
          onClick={() => remove(originIndex)}
        >
          <DeleteIcon />
          <span>Delete</span>
        </button> : <span/>}
        
      </>
    );
  },
);

TableRow.displayName = 'TableRow';

export default TableRow;
