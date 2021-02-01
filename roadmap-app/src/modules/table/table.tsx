import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  roadMapActions,
  roadMapSelectors,
  TableKeys,
  TableKeysType,
} from 'core/roadmap';

import { useSortData } from 'utils/sort-data';
import { checkDataPriority } from 'utils/data-priority';
import Spinner from 'components/spinner';
import TableFilters from './table-filters';
import TableHeader from './table-header';
import TableRow from './table-row';
import { ActiveFiltersProps } from './table.model';
import './table.scss';

const Table = () => {
  const priorityRows: Set<string> = new Set();
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

  const [dataPriority, setDataPriority] = useState(priorityRows);

  const { items, sortData, sortRules } = useSortData(
    dataList,
    dataPriority,
  );

  const [tableContent, setTableContent] = useState(items);

  const toggleAddPriority = (id: string) => {
    setDataPriority((prevState: Set<string>) => {
      if (prevState.has(id)) {
        prevState.delete(id);
        return prevState;
      }
      return prevState.add(id);
    });
  };

  const tableAllContent = useMemo(
    () =>
      tableContent.map((rowData: TableKeysType) => {
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
    const newUpdateTableContent = checkDataPriority({
      dataPriority,
      tableContent,
    });

    setTableContent(newUpdateTableContent);
  };

  const actions = {
    setTableContent,
    changeActiveFilters,
    changePriority,
  };

  useEffect(() => {
    data();
  }, []);

  useEffect(() => {
    setTableContent(items);
  }, [dataList, sortRules, changeActiveFilters]);

  return (
    <div className="content">
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
        <div className="table-buttons">
          <button className="table-button" onClick={changePriority}>
            Make a priority
          </button>
        </div>
      </div>
    </div>
  );
};

Table.displayName = 'Table';

export default Table;
