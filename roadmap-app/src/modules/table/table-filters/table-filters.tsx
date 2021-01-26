import React from 'react';
import SelectFilter from 'components/select-filter';
import { TableKeys, TableKeysType } from 'core/roadmap';
import {
  ActiveFiltersProps,
  Collection,
  CollectionMap,
  TableActionProps,
} from '../table.model';
import './table-filters.scss';

interface TableFiltersProps {
  actions: TableActionProps;
  dataList: TableKeysType[];
  tableContent: TableKeysType[];
  activeFilters: ActiveFiltersProps;
}

const TableFilters = ({
  dataList,
  actions,
  tableContent,
  activeFilters,
}: TableFiltersProps) => {
  const filtersOptions: Collection = {};
  const map: CollectionMap = {};

  const optionGroups: string[] = [
    TableKeys.Title,
    TableKeys.Author,
    TableKeys.Date,
    TableKeys.Raiting,
  ];
  optionGroups.forEach((key) => {
    map[key] = new Set();
    filtersOptions[key] = [];
  });

  tableContent.forEach((item: any) => {
    optionGroups.forEach((key: string) => {
      const value = item[key];
      if (!!value && !map[key].has(value)) {
        map[key].add(value);
        filtersOptions[key].push({
          value: value,
          label: value,
        });
      }
    });
  });

  const tableFilters = optionGroups.map((key: string) => (
    <div key={key} className="table-filters__item">
      <SelectFilter
        byKey={key}
        options={filtersOptions[key]}
        actions={actions}
        dataList={dataList}
        tableContent={tableContent}
        activeFilters={activeFilters}
      />
    </div>
  ));

  return <div className="table-filters">{tableFilters}</div>;
};

TableFilters.displayName = 'TableFilters';

export default TableFilters;
