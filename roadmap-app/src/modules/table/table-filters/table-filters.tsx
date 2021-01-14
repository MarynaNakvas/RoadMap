import React from 'react';
import SelectFilter from 'components/select-filter';
import { TableKeys } from 'core/roadmap';
import './table-filters.scss';

interface OptionProps {
  label: string;
  value: any;
}
interface Collection {
  [key: string]: OptionProps[];
}
interface CollectionMap {
  [key: string]: Set<string>;
}

interface TableFiltersProps {
  setTableContent(props: any): void;
  dataList: [];
}

const TableFilters = ({
  dataList,
  setTableContent,
}: TableFiltersProps) => {
  const filtersOptions: Collection = {};
  const map: CollectionMap = {};

  const optionGroups: any[] = [
    TableKeys.Title,
    TableKeys.Author,
    TableKeys.Date,
    TableKeys.Raiting,
  ];
  optionGroups.forEach((key) => {
    map[key] = new Set();
    filtersOptions[key] = [];
  });

  dataList.forEach((item: any) => {
    optionGroups.forEach((key) => {
      const value = item[key] as string;
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
        onChange={setTableContent}
        dataList={dataList}
      />
    </div>
  ));

  return <div className="table-filters">{tableFilters}</div>;
};

TableFilters.displayName = 'TableFilters';

export default TableFilters;
