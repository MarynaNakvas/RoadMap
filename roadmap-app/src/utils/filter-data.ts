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
  byKey: string;
  activeFilters: ActiveFiltersProps;
  actions: TableActionProps;
}

interface FilterDataProps {
  dataList: TableKeysType[];
  key: string;
  activeFilters: ActiveFiltersProps;
}

export const filterData = ({
  dataList,
  key,
  activeFilters,
}: FilterDataProps) =>
  dataList.filter((item: any) => {
    const modifiedInputValue = activeFilters[key]
      .toString()
      .toLocaleLowerCase();
    const modifiedItem = item[key].toString().toLocaleLowerCase();
    return modifiedItem.includes(modifiedInputValue);
  });

export const filterDataWithValue = ({
  option,
  actionMeta,
  dataList,
  byKey,
  activeFilters,
  actions,
}: FilterDataWithValueProps) => {
  const { changeActiveFilters } = actions;
  let isFirst = true;
  let clearDataList: TableKeysType[] = [];
  const globalFilters: ActiveFiltersProps = {
    raiting: '',
    title: '',
    date: '',
    author: '',
  };

  if (actionMeta?.action === 'clear') {
    activeFilters[byKey] = '';
  } else {
    activeFilters[byKey] = option.value;
  }
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
      if (isEmpty(clearDataList) && isFirst) {
        isFirst = !isFirst;
        clearDataList = filterData({ dataList, key, activeFilters });
      } else {
        clearDataList = filterData({
          dataList: clearDataList,
          key,
          activeFilters,
        });
      }
    }
  }

  return clearDataList;
};
