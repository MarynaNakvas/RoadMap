import React, { useMemo } from 'react';
import Select, {
  Props,
  InputActionMeta,
  ValueType,
} from 'react-select';

import { ReactComponent as SearchIcon } from 'assets/icons/search-sm.svg';
import { OptionProps } from 'core/roadmap';
import { customStyles } from './select-filter.utils';

export interface TableSelectFilterProps extends Props {
  styles?: {
    [key: string]: any;
  };
  hasDropdownIndicator?: boolean;
}

const SelectFilter = ({
  options,
  onSearch,
  onSelect,
  initialValue,
  value = null,
  placeholder = 'Search',
  hasDropdownIndicator = true,
  ...selectProps
}: TableSelectFilterProps) => {
  const placeholderComponent = (
    <div className="seacrh-select__placeholder">
      <SearchIcon />
      <p className="seacrh-select__placeholder-text">{placeholder}</p>
    </div>
  );
  const onInputChange = (
    term: string | null,
    meta: InputActionMeta,
  ) => {
    if (onSearch) {
      onSearch({ term, meta });
    }
  };
  const onChange = (selected: any) => {
    if (selected) {
      const selectAll = selected.selectAll;
      if (selectAll) {
        onSelect({ selected: null });
        return;
      }
    }
    onSelect({ selected });
  };

  return (
    <Select
      value={value}
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
      {...selectProps}
    />
  );
};

SelectFilter.displayName = 'SelectFilter';

export default SelectFilter;
