import React, { useState } from 'react';
import Select, { InputActionMeta } from 'react-select';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { customStyles } from './select-filter.utils';

interface SelectFiltersProps {
  byKey: string;
  options: any;
  onChange(props: any): void;
  dataList: [];
}

const SelectFilter = ({
  options,
  onChange,
  dataList,
  byKey,
}: SelectFiltersProps) => {
  const [inputValue, setInputValue] = useState('');

  const placeholderComponent = (
    <div className="seacrh-select__placeholder">
      <SearchIcon />
      <p className="seacrh-select__placeholder-text">Search</p>
    </div>
  );

  const change = (option: any) => {
    console.log('option', option);

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
    onChange(udateDataList);
  };

  const changeInput = (inputValue: any, reasons: InputActionMeta) => {
    if (reasons.action === 'input-change') {
      const option = {
        label: inputValue,
        value: inputValue,
      };
      change(option);
    }
  };

  return (
    <Select
      isClearable
      isSearchable
      options={options}
      placeholder={placeholderComponent}
      openMenuOnClick={false}
      className="table__select-filter"
      styles={customStyles}
      noOptionsMessage={() =>
        'Sorry, no options \n matched your criteria.'
      }
      onChange={change}
      onInputChange={changeInput}
    />
  );
};

SelectFilter.displayName = 'SelectFilter';

export default SelectFilter;
