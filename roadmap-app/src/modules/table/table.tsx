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

  const [dataPriority, setDataPriority] = useState(priorityRows);

  // const dataListWithoutPriority =
  //   dataPriority.map((i) =>
  //     remove(dataList, (n: any) =>
  //       n.id === i));

  const { items, sortData, sortRules } = useSortData(dataList);

  const [tableContent, setTableContent] = useState(items);

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

  const changePriority = () => {
    const evens = dataPriority.map((i) =>
      remove(tableContent, (n: any) => n.id === i),
    );

    const arr = flattenDeep(evens);

    const updateTableContent = [...arr, ...tableContent];

    setTableContent(updateTableContent);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="table">
      <TableHeader sort={sortData} sortRules={sortRules} />
      <TableFilters dataList={dataList} />
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
