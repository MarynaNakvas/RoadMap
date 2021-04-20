import React, { useEffect, useState } from 'react';
import Select, {
  Props,
  InputActionMeta,
  ActionMeta,
} from 'react-select';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { TableKeysType } from 'core/roadmap';
import {
  ActiveFiltersProps,
  OptionProps,
  SotringRulesProps,
  TableActionProps,
} from 'modules/table/table.model';
import { filterDataWithValue } from 'utils/filter-data';
import { customStyles } from './select-filter.utils';

interface SelectFiltersProps extends Props {
  byKey: string;
  options: any;
  actions: TableActionProps;
  dataList: TableKeysType[];
  activeFilters: ActiveFiltersProps;
  sortRules: SotringRulesProps;
}

const SelectFilter = ({
  options,
  actions,
  dataList,
  byKey,
  activeFilters,
  sortRules,
}: SelectFiltersProps) => {
  const { setTableContent } = actions;
  let initialValue: any = null;
  const [value, setInputValue] = useState(initialValue);

  const placeholderComponent = (
    <div className="seacrh-select__placeholder">
      <SearchIcon />
      <p className="seacrh-select__placeholder-text">Search</p>
    </div>
  );

  const hasSorting = !!sortRules.dataKey;

  const onChange = (
    option: OptionProps,
    actionMeta?: ActionMeta<any>,
  ) => {
    if (hasSorting) {
      sortRules.dataKey = '';
    }
    const updateDataList = filterDataWithValue({
      option,
      actionMeta,
      dataList,
      byKey,
      activeFilters,
      actions,
    });
    const newValue = option ? option : null;
    setInputValue(newValue);
    setTableContent(updateDataList);
  };

  const onInputChange = (
    inputValue: string,
    reasons: InputActionMeta,
  ) => {
    if (reasons.action === 'input-change') {
      const option: OptionProps = {
        value: inputValue,
        label: inputValue,
      };
      onChange(option);
    }
  };

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  return (
    <Select
      value={hasSorting ? null : value}
      isClearable
      options={options}
      placeholder={placeholderComponent}
      openMenuOnClick={false}
      className="table__select-filter"
      styles={customStyles}
      noOptionsMessage={() =>
        'Sorry, no options \n matched your criteria.'
      }
      onChange={onChange}
      onInputChange={onInputChange}
    />
  );
};

SelectFilter.displayName = 'SelectFilter';

export default SelectFilter;
