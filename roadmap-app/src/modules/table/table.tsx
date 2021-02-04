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
import { remove, flattenDeep } from 'lodash';
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

  const dispatch = useDispatch();

  const data = useCallback(() => {
    dispatch(roadMapActions.fetchDataList());
  }, [dispatch]);

  const [activeFilters, changeActiveFilters] = useState(
    globalFilters,
  );

  const [tableContent, setTableContent] = useState(dataList);

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

  const dataListWithPriority = useMemo(() => {
    const array = [...dataList];
    const dataPriority = array.filter(
      (rowData: TableKeysType) => rowData.isPriority,
    );
    dataPriority.map((item: any) =>
      remove(array, (n: any) => n.id === item.id),
    );
    return [...dataPriority, ...array];
  }, [dataList, formik]);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleSubmit();
  };

  const tableAllContent = useMemo(
    () =>
      dataListWithPriority.map((rowData: TableKeysType) => {
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
    [dataListWithPriority, dataList, formik],
  );

  const actions = {
    setTableContent,
    changeActiveFilters,
  };

  useEffect(() => {
    data();
  }, []);

  // useEffect(() => {
  //   setTableContent(items);
  // }, [dataList, sortRules, changeActiveFilters]);

  return (
    <div className="content">
      <div className="table">
        <Form formik={formik}>
          <TableHeader sort={() => null} sortRules={{}} />
          <TableFilters
            dataList={dataList}
            actions={actions}
            tableContent={dataListWithPriority}
            activeFilters={activeFilters}
          />
          <Spinner isFetching={isDataListFetching}>
            <div className="table-rows">{tableAllContent}</div>
          </Spinner>
          <div className="table-buttons">
            <button className="table-button" onClick={onClick}>
              Make a priority
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

Table.displayName = 'Table';

export default Table;
