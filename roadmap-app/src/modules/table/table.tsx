import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikConfig, FormikValues, useFormik } from 'formik';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';
import { roadMapActions, roadMapSelectors } from 'core/roadmap';
import Form from 'components/formik';
import { checkDataPriority } from 'utils/data-priority';
import { useSortData } from 'utils/sort-data';
import Spinner from 'components/spinner';
import TableFilters from './table-filters';
import TableHeader from './table-header';
import TableRow from './table-row';
import { ActiveFiltersProps } from './table.model';
import './table.scss';

type AutoSizerType = {
  width: number;
  height: number;
};
type VariableSizeListType = {
  index: number;
  style: CSSProperties;
};

const Table = () => {
  const TABLE_ROW_HEIGHT = 41;
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

  const getItemSize = () => TABLE_ROW_HEIGHT;
  const lineHeights = getItemSize() * tableContent.length;

  const listRef = useRef<VariableSizeList>(null);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  }, [listRef, lineHeights]);

  const Row = ({ index, style }: VariableSizeListType) => (
    <div style={style}>
      <TableRow
        key={index}
        rowData={tableContent[index]}
        formik={formik}
        addPriority={() => null}
      />
    </div>
  );

  const tableAllContent: any = useMemo(
    () => (
      // <AutoSizer disableWidth>
      //   {({ height }: AutoSizerType) => (
      <VariableSizeList
        className="table-rows"
        ref={listRef}
        width="auto"
        height={500}
        itemCount={tableContent.length}
        itemSize={getItemSize}
      >
        {Row}
      </VariableSizeList>
    ),
    //   )}
    // </AutoSizer>,
    [tableContent, formik],
  );

  // console.log('tableAllContent', tableAllContent);

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
            <div>{tableAllContent}</div>
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
