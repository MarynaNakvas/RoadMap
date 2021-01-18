import React, { useEffect, useState } from 'react';
import Select, { Props, InputActionMeta } from 'react-select';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { customStyles } from './select-filter.utils';

interface SelectFiltersProps extends Props {
  byKey: string;
  options: any;
  filterData(props: any): void;
  dataList: [];
}

const SelectFilter = ({
  options,
  filterData,
  dataList,
  byKey,
}: SelectFiltersProps) => {
  let initialValue: any = null;
  const [value, setInputValue] = useState(initialValue);

  const placeholderComponent = (
    <div className="seacrh-select__placeholder">
      <SearchIcon />
      <p className="seacrh-select__placeholder-text">Search</p>
    </div>
  );

  const onChange = (option: any) => {
    const udateDataList = option
      ? dataList.filter((item: any) => {
          const modifiedInputValue = option.value
            .toString()
            .toLocaleLowerCase();
          const modifiedItem = item[byKey]
            .toString()
            .toLocaleLowerCase();
          return modifiedItem.includes(modifiedInputValue);
        })
      : dataList;
    const newValue = option ? option : null;
    setInputValue(newValue);
    filterData(udateDataList);
  };

  const onInputChange = (
    inputValue: any,
    reasons: InputActionMeta,
  ) => {
    if (reasons.action === 'input-change') {
      const option: any = {
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
      value={value}
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
