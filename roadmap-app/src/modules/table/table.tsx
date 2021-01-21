import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove, flattenDeep } from 'lodash';
import {
  roadMapActions,
  roadMapSelectors,
  TableKeys,
} from 'core/roadmap';

import { useSortData } from 'utils/sort-data';
import Spinner from 'components/spinner';
import TableFilters from './table-filters';
import TableHeader from './table-header';
import TableRow from './table-row';

import './table.scss';

interface PriorityRowsSet {
  [key: number]: number;
}

const Table = () => {
  const priorityRows: any = new Set();
  const globalFilters: any = {
    raiting: '',
    title: '',
    date: '',
    author: '',
  };
  // const priorityRows: number[] = [];
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

  const [dataPriority, setDataPriority] = useState(priorityRows);

  const { items, sortData, sortRules } = useSortData(
    dataList,
    dataPriority,
  );

  const [tableContent, setTableContent] = useState(items);

  const toggleAddPriority = (id: number) => {
    setDataPriority((prevState: any) => {
      if (prevState.has(id)) {
        prevState.delete(id);
        return prevState;
      }
      return prevState.add(id);
    });
  };

  // const toggleAddPriority = (id: number) => {
  //   setDataPriority((prevState: number[]) =>
  //     prevState.includes(id) ? prevState.filter((item) => item !== id) : [...prevState, id],
  //   )
  // };
  // console.log('updateTableContent', updateTableContent);

  const actions = { setTableContent, changeActiveFilters };
  const tableAllContent = useMemo(
    () =>
      tableContent.map((rowData: any) => {
        const { [TableKeys.id]: key } = rowData;
        return (
          <TableRow
            key={key}
            rowData={rowData}
            addPriority={toggleAddPriority}
          />
        );
      }),
    [tableContent],
  );

  const changePriority = () => {
    const dataPriorityArray = Array.from(dataPriority);
    const priorityRowsArray = dataPriorityArray.map((i: any) =>
      remove(tableContent, (n: any) => n.id === i),
    );

    const priorityRows = flattenDeep(priorityRowsArray);

    const newUpdateTableContent = [...priorityRows, ...tableContent];

    setTableContent(newUpdateTableContent);
  };

  useEffect(() => {
    data();
  }, []);

  useEffect(() => {
    setTableContent(items);
  }, [dataList, sortRules]);

  // useEffect(() => {
  //   changeActiveFilters(globalFilters);
  // }, [globalFilters]);

  return (
    <div className="table">
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
      <button className="table-button" onClick={changePriority}>
        Make a priority
      </button>
    </div>
  );
};

Table.displayName = 'Table';

export default Table;
