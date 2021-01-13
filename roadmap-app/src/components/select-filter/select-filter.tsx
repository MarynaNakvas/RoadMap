import React, { ChangeEvent } from 'react';
import Select, { InputActionMeta } from 'react-select';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { customStyles } from './select-filter.utils';

// import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

const SelectFilter = ({ options }: any) => {
  const placeholderComponent = (
    <div className="seacrh-select__placeholder">
      <SearchIcon />
      <p className="seacrh-select__placeholder-text">Search</p>
    </div>
  );

  const onChange = (option: any) => {
    console.log('option', option);

    const { label, value } = option;
    // const otherKey = options.filter(
    //   (opt: any) => opt.label === label && opt.value.includes(inputValue),
    // );
    // return value.includes(inputValue) || otherKey.length > 0;
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
      onChange={onChange}
    />
  );
};

SelectFilter.displayName = 'SelectFilter';

export default SelectFilter;
