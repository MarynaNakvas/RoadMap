import { CSSProperties } from 'react';

export const customStyles = {
  control: (base: CSSProperties, state: any) => {
    const {
      hasValue,
      selectProps: { menuIsOpen, inputValue },
    } = state;

    return {
      ...base,
      display: 'flex',
      height: '100%',
      border: 'none',
      borderRadius: 0,
      boxShadow: 'none',
      '&:hover': {
        border: 'none',
        boxShadow: 'none',
      },
      background:
        hasValue || menuIsOpen || inputValue ? 'green' : 'inherit',
    };
  },
  container: (base: CSSProperties) => ({
    ...base,
    width: '100%',
    height: '100%',
  }),
  singleValue: (base: CSSProperties) => ({
    ...base,
    color: 'white',
  }),
  indicatorSeparator: (base: CSSProperties) => ({
    ...base,
    display: 'none',
  }),
  clearIndicator: (base: CSSProperties, state: any) => {
    const { hasValue } = state;
    return {
      ...base,
      padding: '3px',
      cursor: 'pointer',
      color: hasValue ? 'white' : 'inherit',
      '&:hover': {
        color: hasValue ? '#cac8c8' : 'inherit',
      },
    };
  },
  menu: (base: CSSProperties, state: any) => ({
    ...base,
    top: 'inherit',
    minWidth: '100%',
    margin: 0,
    border: 0,
    borderRadius:
      state.placement === 'bottom'
        ? '0px 0px 8px 8px'
        : '8px 8px 0px 0px',
    overflow: 'hidden',
    background: 'green',
    color: 'white',
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  placeholder: (base: CSSProperties) => ({
    ...base,
    display: 'flex',
  }),
  input: (base: CSSProperties, state: any) => {
    const { value } = state;
    return {
      ...base,
      minWidth: '150px',
      color: !!value ? 'white' : 'inherit',
    };
  },
  option: (base: CSSProperties, state: any) => {
    const focusedStateStyles: CSSProperties = {};
    const { isSelected, isFocused } = state;
    if (isFocused || isSelected) {
      focusedStateStyles.background = '#0c560c';
    }

    return {
      ...base,
      display: 'flex',
      alignItems: 'center',
      minHeight: '34px',
      padding: '0 8px',
      borderBottom: '1px solid #ffffff47',
      cursor: 'pointer',
      ...focusedStateStyles,
      '&:hover': {
        background: '#0c560c',
      },
    };
  },
  menuList: (base: CSSProperties) => ({
    ...base,
    padding: 0,
    '&::-webkit-scrollbar': {
      width: '5px',
      '&-thumb': {
        background: '#529652bf',
        borderRadius: '2px',
      },
      '&-track': {
        background: '#e8e4e4',
      },
    },
  }),
  valueContainer: (base: CSSProperties) => ({
    ...base,
    padding: '0 0 0 5px',
  }),
};
