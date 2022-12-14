import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikConfig, useFormik } from 'formik';
import { get, isEqual } from 'lodash';

import { tableActions, tableSelectors, TableData } from 'core/roadmap';
import {
  TableKeys,
} from 'core/roadmap/table.model';
import {
  NO_ITEMS_PLACEHOLDER_DESCRIPTION,
  NO_SELECTED_ITEMS_PLACEHOLDER_TITLE,
  NO_SELECTED_ITEMS_PLACEHOLDER_DESCRIPTION,
} from 'core/app-constants';
import ScreenPlaceholder from 'components/screen-placeholder';
import StickyFormControls from 'components/sticky-form-controls';
import Spinner from 'components/spinner';
import Form from 'components/formik';
import { debounce } from 'utils/debounce';
import { useSorting } from 'utils/sorting';

import TableFilters, { useFiltering } from './table-filters';
import TableHeader from './table-header';
import TableRow from './table-row';
import { processData, addRow, removeRow } from './table-utils';

import './table.scss';

const TableComponent: React.FunctionComponent = memo(() => {
  const dispatch = useDispatch();

  const isDataListFetching = useSelector(
    tableSelectors.getIsDataListFetching,
  );

  const isDataSubmitting = useSelector(
    tableSelectors.getIsDataSubmitting,
  );

  const initialValues = useSelector(tableSelectors.getData);

  const submit = useCallback(
    (values: TableData) => {
      dispatch(
        tableActions.submitData({
          values: values.dataList,
          initialValues: initialValues.dataList,
        }),
      );
    },
    [dispatch, initialValues],
  );

  const formikConfig = useMemo(
    (): FormikConfig<TableData> => ({
      validateOnChange: true,
      validateOnBlur: true,
      enableReinitialize: true,
      initialValues,
      onSubmit: submit,
    }),
    [initialValues],
  );

  const formik = useFormik(formikConfig);
  const { values, resetForm, isSubmitting } = formik;
  const { dataList } = values;
  const isTouched = useMemo(
    () => !isEqual(values, initialValues) || isSubmitting,
    [values, initialValues, isSubmitting],
  );

  // Sorting and filtering.
  const { sortingRules, changeSortingRules } = useSorting(
    TableKeys.rating,
    false,
  );
  const {
    title,
    author,
    date,
    rating,
    hasFilters,
    resetFilters,
  } = useFiltering(dataList);
  const processedData = useMemo(
    () =>
      processData(
        dataList,
        sortingRules,
        title.value,
        author.value,
        date.value,
        rating.value,
      ),
    [
      dataList,
      sortingRules,
      title.value,
      author.value,
      date.value,
      rating.value,
    ],
  );

  // Add and remove
  const addEntry = useCallback(
    debounce(() =>
      formik.setFieldValue(
        'dataList',
        addRow(dataList),
      ),
    ),
    [dataList, formik.setFieldValue],
  );
  const removeEntry = useCallback(
    (originIndex: number) =>
      formik.setFieldValue(
        'dataList',
        removeRow(dataList, originIndex),
      ),
    [dataList, formik.setFieldValue],
  );

  useEffect(() => {
    dispatch(tableActions.fetchDataList());
  }, [dispatch]);

  useEffect(
    () => () => {
      dispatch(tableActions.resetDataList());
    },
    [dispatch],
  );

  return (
    <div className="table">
      <Form formik={formik}>
        <div className="table__content-wrapper">
          <div className="table__controls">
            <div className="table__title">Posts</div>

            <div className="table__buttons">
              {hasFilters && (
                <button
                  type="button"
                  className="table__button--text"
                  onClick={resetFilters}
                >
                  <span>Clear filters</span>
                </button>
              )}

              <button
                type="button"
                className="table__button-action"
                onClick={addEntry}
              >
                <span>Create new</span>
              </button>
            </div>
          </div>

          <TableHeader
            sortingRules={sortingRules}
            changeSortingRules={changeSortingRules}
          />

          <TableFilters
            title={title}
            author={author}
            date={date}
            rating={rating}
          />

          <Spinner isFetching={isDataListFetching}>
            {processedData.length ? (
              <div className="table__rows">
                {processedData.map((item) => {
                  const id = get(item, TableKeys.id);
                  return (<div className="table-row" key={id}>
                    <TableRow
                      formik={formik}
                      item={item}
                      remove={removeEntry}
                      isTouched={isTouched}
                    />
                  </div>)})}
              </div>
            ) : (
              <div className="table__placeholder-wrapper">
                <ScreenPlaceholder
                  title={
                    hasFilters
                      ? NO_SELECTED_ITEMS_PLACEHOLDER_TITLE
                      : ''
                  }
                  description={
                    hasFilters
                      ? NO_SELECTED_ITEMS_PLACEHOLDER_DESCRIPTION
                      : NO_ITEMS_PLACEHOLDER_DESCRIPTION
                  }
                />
              </div>
            )}
          </Spinner>
        </div>
        <StickyFormControls
          className="table__form-controls"
          inProgress={isDataSubmitting}
          isTouched={isTouched}
          resetForm={resetForm}
          title="Save Changes"
        />
      </Form>
    </div>
  );
});

TableComponent.displayName = 'TableComponent';

export default TableComponent;
