import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikConfig, FormikValues, useFormik } from 'formik';
import {
  roadMapActions,
  roadMapSelectors,
  TableKeys,
  TableKeysType,
} from 'core/roadmap';
import Form from 'components/formik';
import { checkDataPriority } from 'utils/data-priority';
import { useSortData } from 'utils/sort-data';
import Spinner from 'components/spinner';
import TableFilters from './table-filters';
import TableHeader from './table-header';
import TableRow from './table-row';
import { ActiveFiltersProps } from './table.model';
import './table.scss';

const Table = () => {
  const globalFilters: ActiveFiltersProps = {
    raiting: '',
    title: '',
    date: '',
    author: '',
  };

  const dataList = useSelector(roadMapSelectors.getDataList);

  const isDataListFetching = useSelector(
    roadMapSelectors.getIsDataListFetched,
  );

  const isMakePriorityFetching = useSelector(
    roadMapSelectors.getIsMakePriorityFetched,
  );

  const dispatch = useDispatch();

  const data = useCallback(() => {
    dispatch(roadMapActions.fetchDataList());
  }, [dispatch]);

  const [activeFilters, changeActiveFilters] = useState(
    globalFilters,
  );

  const { items, sortData, sortRules } = useSortData(dataList);

  const dataListWithPriority = useMemo(
    () => checkDataPriority({ tableContent: items }),
    [items],
  );

  const [tableContent, setTableContent] = useState(
    dataListWithPriority,
  );

  const initialValues = useMemo(() => dataList, [dataList]);

  const makePriority = useCallback(
    (payload) => {
      dispatch(roadMapActions.makePriority(payload));
    },
    [dispatch],
  );

  const formikConfig = useMemo(
    (): FormikConfig<FormikValues> => ({
      enableReinitialize: true,
      initialValues,
      onSubmit: (values: any) => {
        makePriority({ values, initialValues });
      },
    }),
    [initialValues],
  );

  const formik = useFormik(formikConfig);

  const { handleSubmit } = formik;

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleSubmit();
  };

  const tableAllContent = useMemo(
    () =>
      tableContent.map((rowData: TableKeysType) => {
        const { [TableKeys.id]: key } = rowData;
        return (
          <TableRow
            key={key}
            rowData={rowData}
            addPriority={() => null}
            formik={formik}
          />
        );
      }),
    [tableContent, formik],
  );

  const actions = {
    setTableContent,
    changeActiveFilters,
  };

  useEffect(() => {
    data();
  }, []);

  useEffect(() => {
    setTableContent(dataListWithPriority);
  }, [dataList, changeActiveFilters]);

  return (
    <div className="content">
      <div className="table">
        <Form formik={formik}>
          <TableHeader sort={sortData} sortRules={sortRules} />
          <TableFilters
            dataList={dataList}
            actions={actions}
            tableContent={tableContent}
            activeFilters={activeFilters}
          />
          <Spinner isFetching={isDataListFetching}>
            <div className="table-rows">{tableAllContent}</div>
          </Spinner>
          <div className="table-buttons">
            <Spinner isFetching={isMakePriorityFetching}>
              <button className="table-button" onClick={onClick}>
                Make a priority
              </button>
            </Spinner>
          </div>
        </Form>
      </div>
    </div>
  );
};

Table.displayName = 'Table';

export default Table;
