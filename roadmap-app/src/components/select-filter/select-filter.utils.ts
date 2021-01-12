import { CSSProperties } from 'react';

export const customStyles = {
  option: (base: CSSProperties) => ({
    ...base,
    display: 'flex',
    width: '100%',
    minWidth: '34px',
    minHeight: '34px',
    padding: '0 8px',
    fontSize: '13px',
    lineHeight: '16px',
    cursor: 'pointer',
  }),
  control: () => ({
    display: 'flex',
  }),
  container: () => ({
    width: '100%',
  }),
  singleValue: (base: CSSProperties) => ({
    ...base,
    fontSize: '13px',
    lineHeight: '16px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
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
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
};
