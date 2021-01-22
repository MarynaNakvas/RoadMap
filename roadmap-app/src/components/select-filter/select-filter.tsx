import React, { useEffect, useState } from 'react';
import Select, {
  Props,
  InputActionMeta,
  ActionMeta,
} from 'react-select';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { isEmpty } from 'lodash';
import { customStyles } from './select-filter.utils';

interface SelectFiltersProps extends Props {
  byKey: string;
  options: any;
  actions: any;
  dataList: [];
  tableContent: [];
  activeFilters: any;
}

const SelectFilter = ({
  options,
  actions,
  dataList,
  byKey,
  tableContent,
  activeFilters,
}: SelectFiltersProps) => {
  // const {setTableContent, changeActiveFilters} = actions;
  let initialValue: any = null;
  const [value, setInputValue] = useState(initialValue);

  const placeholderComponent = (
    <div className="seacrh-select__placeholder">
      <SearchIcon />
      <p className="seacrh-select__placeholder-text">Search</p>
    </div>
  );

  const onChange = (option: any, actionMeta?: ActionMeta<any>) => {
    let updateDataList: any = [];
    let clearDataList: any = [];
    const globalFilters: any = {
      raiting: '',
      title: '',
      date: '',
      author: '',
    };
    if (actionMeta?.action === 'clear') {
      activeFilters[byKey] = '';
      actions.changeActiveFilters((prevState: any) => ({
        ...prevState,
        ...activeFilters,
      }));
      if (
        JSON.stringify(activeFilters) ===
        JSON.stringify(globalFilters)
      ) {
        updateDataList = dataList;
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
        updateDataList = clearDataList;
      }
    } else {
      activeFilters[byKey] = option.value;
      actions.changeActiveFilters((prevState: any) => ({
        ...prevState,
        ...activeFilters,
      }));
      updateDataList = tableContent.filter((item: any) => {
        const modifiedInputValue = option.value
          .toString()
          .toLocaleLowerCase();
        const modifiedItem = item[byKey]
          .toString()
          .toLocaleLowerCase();
        return modifiedItem.includes(modifiedInputValue);
      });
    }
    const newValue = option ? option : null;
    setInputValue(newValue);
    actions.setTableContent(updateDataList);
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

  // console.log('tableContent', tableContent);

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
