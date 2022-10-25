import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';
import { FormikConfig, useFormik } from 'formik';
import { isEqual } from 'lodash';

import { tableActions, tableSelectors, Table } from 'core/roadmap';
import {
  TableKeys,
  VariableSizeListType,
  AutoSizerType,
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

const TABLE_ROW_HEIGHT = 41;

const TableComponent: React.FunctionComponent = memo(() => {
  const dispatch = useDispatch();

  const isDataListFetching = useSelector(
    tableSelectors.getIsDataListFetching,
  );

  const isDataSubmitting = useSelector(
    tableSelectors.getIsDataSubmitting,
  );

  const dataList = useSelector(tableSelectors.getDataList);

  const submit = useCallback(
    (values: Table[]) => {
      dispatch(
        tableActions.submitData({
          values,
          initialValues: dataList,
        }),
      );
    },
    [dispatch, dataList],
  );

  const formikConfig = useMemo(
    (): FormikConfig<any> => ({
      validateOnChange: true,
      validateOnBlur: true,
      enableReinitialize: true,
      initialValues: dataList,
      onSubmit: submit,
    }),
    [dataList],
  );

  const formik = useFormik(formikConfig);
  const { values, resetForm, isSubmitting } = formik;
  const isTouched = useMemo(
    () => !isEqual(values, dataList) || isSubmitting,
    [values, dataList, isSubmitting],
  );
  const data = values;

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
  } = useFiltering(data);
  const processedData = useMemo(
    () =>
      processData(
        data,
        sortingRules,
        title.value,
        author.value,
        date.value,
        rating.value,
      ),
    [
      data,
      sortingRules,
      title.value,
      author.value,
      date.value,
      rating.value,
    ],
  );

  // Add and remove
  const addEntry = useCallback(
    debounce(() => formik.setValues(addRow(data))),
    [data, formik.setValues],
  );
  const removeEntry = useCallback(
    (originIndex: number) =>
      formik.setValues(removeRow(data, originIndex)),
    [data, formik.setValues],
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

  const getItemSize = () => TABLE_ROW_HEIGHT;
  const lineHeights = getItemSize() * processedData.length;

  const listRef = useRef<VariableSizeList>(null);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  }, [listRef, lineHeights]);

  const Row = ({ index, style }: VariableSizeListType) => (
    <div className="table-row" style={style}>
      <TableRow
        key={index}
        formik={formik}
        item={processedData[index]}
        remove={removeEntry}
      />
    </div>
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
                <AutoSizer
                  className="table__rows-auto-sizer"
                  disableWidth
                >
                  {({ height }: AutoSizerType) => (
                    <VariableSizeList
                      ref={listRef}
                      width="auto"
                      height={height}
                      itemCount={processedData.length}
                      itemSize={getItemSize}
                    >
                      {Row}
                    </VariableSizeList>
                  )}
                </AutoSizer>
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
