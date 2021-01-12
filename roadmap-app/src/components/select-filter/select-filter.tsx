import React from 'react';
import Select from 'react-select';
import { customStyles } from './select-filter.utils';

// import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

const SelectFilter = ({ options }: any) => {
  console.log('Here');
  return (
    <Select
      // menuIsOpen={true}
      isClearable
      isSearchable
      options={options}
      placeholder={'Search'}
      openMenuOnClick={false}
      className="table__select-filter"
      styles={customStyles}
      noOptionsMessage={() =>
        'Sorry, no options \n matched your criteria.'
      }
    />
  );
};

SelectFilter.displayName = 'SelectFilter';

export default SelectFilter;
