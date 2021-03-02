import CheckBox from 'components/checkbox';
import { roadMapActions, roadMapSelectors } from 'core/roadmap';
import { FormikConfig, FormikValues, useFormik } from 'formik';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useTable,
  useBlockLayout,
  useSortBy,
  useFilters,
  useGlobalFilter,
  TableOptions,
} from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';
import classNames from 'clsx';
import { ReactComponent as SortingIcon } from 'assets/icons/arrow-sort.svg';
import './react-table.scss';

interface AutoSizerType {
  width: number;
  height: number;
}
interface VariableSizeListType {
  index: number;
  style: CSSProperties;
}

interface Type {
  [key: string]: any;
  // TableOptions<object>;
}

const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}: Type) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e: any) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};

function Table({ columns, data }: any) {
  const filterTypes = useMemo(
    () => ({
      text: (rows: any, id: any, filterValue: any) =>
        rows.filter((row: any) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        }),
    }),
    [],
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      // defaultColumn, // Be sure to pass the defaultColumn option
      // filterTypes,
    },
    useBlockLayout,
    useFilters,
    useGlobalFilter,
    useSortBy,
  );
  const TABLE_ROW_HEIGHT = 41;
  const getItemSize = () => TABLE_ROW_HEIGHT;

  const Row = useCallback(
    ({ index, style }: VariableSizeListType) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="react-table-row"
        >
          {row.cells.map((cell: any) => (
            <div
              key={2}
              {...cell.getCellProps()}
              className="react-table-row__item"
            >
              {cell.render('Cell')}
            </div>
          ))}
        </div>
      );
    },
    [prepareRow, rows],
  );

  // function main(depth: number) {
  // 	return depth%5 ? Math.trunc(depth/5 + 1) : Math.trunc(depth/5);
  // };

  // console.log('main', main(128));

  return (
    <div className="content">
      <div {...getTableProps()} className="react-table">
        <div className="react-table-headers">
          {headerGroups.map((headerGroup: any) => (
            <div
              key={1}
              {...headerGroup.getHeaderGroupProps()}
              className="tr"
            >
              {headerGroup.headers.map((column: any) => {
                console.log('column', column.isSorted);

                return (
                  <div
                    key={2}
                    {...column.getHeaderProps(
                      column.getSortByToggleProps(),
                    )}
                  >
                    {column.render('Header')}
                    <button
                      className={classNames('sorting-button', {
                        // 'sorting-button__active': isActiveSortingButton,
                        'sorting-button__increase': !column.isSortedDesc,
                        'sorting-button__decrease':
                          column.isSortedDesc,
                      })}
                    >
                      <SortingIcon />
                    </button>
                    {/* <span>
											{column.isSorted
												? column.isSortedDesc
													? ' 🔽'
													: ' 🔼'
												: ''}
										</span> */}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="react-table-filters">
          {headerGroups.map((headerGroup: any) => (
            <div
              key={1}
              {...headerGroup.getHeaderGroupProps()}
              className="tr"
            >
              {headerGroup.headers.map((column: any) => (
                <div key={2} {...column.getHeaderProps()}>
                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()} className="table-rows__wrapper">
          <AutoSizer disableWidth>
            {({ height }: AutoSizerType) => (
              <VariableSizeList
                className="table-rows"
                width="auto"
                height={height}
                itemCount={rows.length}
                itemSize={getItemSize}
              >
                {Row}
              </VariableSizeList>
            )}
          </AutoSizer>
        </div>
      </div>
    </div>
  );
}

const ReactTable = () => {
  const dataList = useSelector(roadMapSelectors.getDataList);

  const dispatch = useDispatch();

  const data = useCallback(() => {
    dispatch(roadMapActions.fetchDataList());
  }, [dispatch]);

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
    [],
  );

  const formik = useFormik(formikConfig);

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Author',
        accessor: 'author',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Raiting',
        accessor: 'raiting',
      },
      {
        Header: 'Priority',
        accessor: (originalRow: any, rowIndex: any) => {
          const name = `${rowIndex}.isPriority`;
          return (
            <CheckBox
              className="table-row__item-action"
              name={name}
              formik={formik}
            />
          );
        },
      },
    ],
    [formik],
  );

  useEffect(() => {
    data();
  }, []);

  return <Table columns={columns} data={dataList} />;
};

ReactTable.displayName = 'ReactTable';

export default ReactTable;
