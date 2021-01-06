import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const Table: React.FunctionComponent = () => {
  const dataList = useSelector(roadMapSelectors.getDataList);

  const isDataListFetching = useSelector(
    roadMapSelectors.getIsDataListFetched,
  );

  console.log('isDataListFetching', isDataListFetching);

  const dispatch = useDispatch();

  const data = useCallback(() => {
    dispatch(roadMapActions.fetchDataList());
  }, [dispatch]);

  useEffect(() => {
    data();
  }, []);

  const { items, sortData, sortRules } = useSortData(dataList);

  const tableRows = useMemo(
    () =>
      items.map((rowData: any) => {
        const { [TableKeys.id]: key } = rowData;

        return <TableRow key={key} rowData={rowData} />;
      }),
    [items, sortData, sortRules],
  );

  return (
    <div className="table">
      <TableHeader sort={sortData} sortRules={sortRules} />
      <TableFilters />
      <Spinner isFetching={isDataListFetching}>
        <div className="table-rows">{tableRows}</div>
      </Spinner>
    </div>
  );
};

Table.displayName = 'Table';

export default Table;
