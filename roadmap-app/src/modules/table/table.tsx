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

const Table = () => {
  let priorityRows: number[] = [];
  const dataList = useSelector(roadMapSelectors.getDataList);

  const isDataListFetching = useSelector(
    roadMapSelectors.getIsDataListFetched,
  );

  const dispatch = useDispatch();

  const data = useCallback(() => {
    dispatch(roadMapActions.fetchDataList());
  }, [dispatch]);

  const { items, sortData, sortRules } = useSortData(dataList);

  const [tableContent, setTableContent] = useState(items);

  const [dataPriority, setDataPriority] = useState(priorityRows);

  useEffect(() => {
    setTableContent(items);
  }, [items]);

  const addPriority = (id: number) => {
    !dataPriority.includes(id)
      ? setDataPriority((prevState: number[]) => [...prevState, id])
      : setDataPriority((prevState: number[]) =>
          prevState.filter((item) => item !== id),
        );
  };

  const tableAllContent = useMemo(
    () =>
      tableContent.map((rowData: any) => {
        const { [TableKeys.id]: key } = rowData;
        return (
          <TableRow
            key={key}
            rowData={rowData}
            addPriority={addPriority}
          />
        );
      }),
    [tableContent],
  );

  console.log('tableAllContent', tableAllContent);

  const changePriority = () => {
    const evens = remove(
      dataList,
      (n: any) => n.id === dataPriority[0],
    );
    // dataPriority.map((i) =>
    //   remove(dataList, (n: any) =>
    //     n.id === i));

    const arr = flattenDeep(evens);

    const tableRowsPriority = arr.map((rowData: any) => {
      const { [TableKeys.id]: key } = rowData;
      return (
        <TableRow
          key={key}
          rowData={rowData}
          addPriority={addPriority}
        />
      );
    });

    const tableRows = dataList.map((rowData: any) => {
      const { [TableKeys.id]: key } = rowData;
      return (
        <TableRow
          key={key}
          rowData={rowData}
          addPriority={addPriority}
        />
      );
    });

    const updateTableContent = [...tableRowsPriority, ...tableRows];
    setTableContent(updateTableContent);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="table">
      <TableHeader sort={sortData} sortRules={sortRules} />
      <TableFilters />
      <Spinner isFetching={isDataListFetching}>
        <div className="table-rows">{tableAllContent}</div>
      </Spinner>
      <button onClick={changePriority}>Make a priority</button>
    </div>
  );
};

Table.displayName = 'Table';

export default Table;
