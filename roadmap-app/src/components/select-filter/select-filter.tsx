import React, { memo } from 'react';
import Select, { Props, InputActionMeta } from 'react-select';

import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { customStyles } from './select-filter.utils';

export interface TableSelectFilterProps extends Props {
  styles?: {
    [key: string]: any;
  };
}

const SelectFilter: React.FunctionComponent<TableSelectFilterProps> = memo(
  ({
    options,
    onSearch,
    onSelect,
    value = null,
    placeholder = 'Search',
    ...selectProps
  }) => {
    const placeholderComponent = (
      <div className="seacrh-select__placeholder">
        <SearchIcon />
        <p className="seacrh-select__placeholder-text">
          {placeholder}
        </p>
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
  },
);

SelectFilter.displayName = 'SelectFilter';

export default SelectFilter;
