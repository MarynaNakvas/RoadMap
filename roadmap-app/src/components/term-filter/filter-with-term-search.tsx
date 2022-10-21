import React, { memo, useCallback } from 'react';

import { debounce } from 'utils/debounce';
import { FilterProps } from 'utils/filtering';

import { OnSearchProps } from 'core/roadmap';
import ValueContainer from './value-container';
import SelectFilter from '../select-filter';

interface FilterWithTermSearchProps {
  filter: FilterProps<any>;
  // other props
  [key: string]: any;
}

const components = { ValueContainer };

const FilterWithTermSearch: React.FunctionComponent<FilterWithTermSearchProps> = memo(
  ({ filter, ...otherProps }) => {
    const debouncedSearch = useCallback(
      debounce(
        (term) =>
          filter.setOption({
            label: term,
            value: term,
          }),
        500,
      ),
      [filter.setOption],
    );
    // We may only use debounced search for valid action.
    const onSearch = useCallback(
      ({ term, meta: { action } }: OnSearchProps) => {
        if (action === 'input-change') {
          debouncedSearch(term);
        }
      },
      [debouncedSearch],
    );

    const onSelect = useCallback(
      ({ selected }) => filter.setOption(selected),
      [filter.setOption],
    );

    return (
      <SelectFilter
        value={filter.option}
        options={filter.options}
        components={components}
        onSearch={onSearch}
        onSelect={onSelect}
        isClearable
        openMenuOnClick={false}
        hasDropdownIndicator={false}
        {...otherProps}
      />
    );
  },
);

FilterWithTermSearch.displayName = 'FilterWithTermSearch';

export default FilterWithTermSearch;
