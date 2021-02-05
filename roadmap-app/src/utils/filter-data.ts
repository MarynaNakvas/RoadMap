import { ActionMeta } from 'react-select';
import { isEmpty } from 'lodash';
import { TableKeysType } from 'core/roadmap';
import {
  ActiveFiltersProps,
  OptionProps,
  TableActionProps,
} from 'modules/table/table.model';
import { checkDataPriority } from './data-priority';

interface FilterDataWithValueProps {
  option: OptionProps;
  actionMeta?: ActionMeta<any>;
  dataList: TableKeysType[];
  tableContent: TableKeysType[];
  byKey: string;
  activeFilters: ActiveFiltersProps;
  actions: TableActionProps;
}

export const filterDataWithValue = ({
  option,
  actionMeta,
  dataList,
  tableContent,
  byKey,
  activeFilters,
  actions,
}: FilterDataWithValueProps) => {
  const { changeActiveFilters } = actions;
  let clearDataList: TableKeysType[] = [];
  const globalFilters: ActiveFiltersProps = {
    raiting: '',
    title: '',
    date: '',
    author: '',
  };
  if (actionMeta?.action === 'clear') {
    activeFilters[byKey] = '';
    changeActiveFilters((prevState: ActiveFiltersProps) => ({
      ...prevState,
      ...activeFilters,
    }));
    if (
      JSON.stringify(activeFilters) === JSON.stringify(globalFilters)
    ) {
      return checkDataPriority({ tableContent: dataList });
    } else {
      for (let key in activeFilters) {
        if (activeFilters[key] !== '') {
          if (isEmpty(clearDataList)) {
            clearDataList = dataList.filter((item: any) => {
              const modifiedInputValue = activeFilters[key]
                .toString()
                .toLocaleLowerCase();
              const modifiedItem = item[key]
                .toString()
                .toLocaleLowerCase();
              return modifiedItem.includes(modifiedInputValue);
            });
          } else {
            clearDataList = clearDataList.filter((item: any) => {
              const modifiedInputValue = activeFilters[key]
                .toString()
                .toLocaleLowerCase();
              const modifiedItem = item[key]
                .toString()
                .toLocaleLowerCase();
              return modifiedItem.includes(modifiedInputValue);
            });
          }
        }
      }
      return clearDataList;
    }
  } else {
    activeFilters[byKey] = option.value;
    changeActiveFilters((prevState: ActiveFiltersProps) => ({
      ...prevState,
      ...activeFilters,
    }));
    return tableContent.filter((item: any) => {
      const modifiedInputValue = option.value
        .toString()
        .toLocaleLowerCase();
      const modifiedItem = item[byKey].toString().toLocaleLowerCase();
      return modifiedItem.includes(modifiedInputValue);
    });
  }
};
