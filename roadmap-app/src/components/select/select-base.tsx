import React, { useMemo, memo } from 'react';

import { InputAdornment } from '@material-ui/core';
import {
  default as ReactSelect,
  components,
  OptionProps,
  Props,
} from 'react-select';

import { ReactComponent as NavigateDownIcon } from 'assets/icons/navigate_down.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import ActionItem from 'components/action-item';

import SelectItem from './select-item';

const CustomOption = (optionProps: any) => {
  const { data } = optionProps;
  const { Option } = components;

  return (
    <Option {...optionProps}>
      <SelectItem {...data} />
    </Option>
  );
};

const DropdownIndicator = (props: any) => {
  const { DropdownIndicator } = components;

  return (
    <DropdownIndicator {...props}>
      <NavigateDownIcon />
    </DropdownIndicator>
  );
};

const ClearIndicator = (props: any) => {
  const { clearValue } = props;
  return (
    <components.ClearIndicator {...props}>
      <InputAdornment
        className="clear-button"
        position="end"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            clearValue();
          }
        }}
      >
        <ActionItem icon={<CloseIcon />} tooltip={'Clear field'} />
      </InputAdornment>
    </components.ClearIndicator>
  );
};

export interface SelectOption extends OptionProps<any, false> {
  value?: any;
}

export interface SelectOptionsMap {
  [key: string]: SelectOption;
}

export interface SelectConfig extends Props {
  options: SelectOption[];
  optionsMap: SelectOptionsMap;
}

interface SelectBaseProps extends SelectConfig {
  value: any;
  hasErrors?: boolean;
  handleChange(option: any): void;
  disabled?: boolean;
}

const SelectBase: React.FunctionComponent<SelectBaseProps> = memo(
  ({
    optionsMap,
    options = [],
    disabled,
    components: customComponents = {},

    value,
    hasErrors,
    handleChange,

    ...innerProps
  }) => {
    const selectedOption = useMemo(() => {
      const getOption = (value: any) => {
        // We are trying to use optionsMap.
        // If it is not available than we can try to use options.
        if (optionsMap && value in optionsMap) {
          return optionsMap[value] || null;
        }
        return (
          options.find((option) => value === option.value) || null
        );
      };
      return getOption(value);
    }, [value, optionsMap, options]);

    const selectComponents = useMemo(
      () => ({
        DropdownIndicator,
        ClearIndicator,
        Option: CustomOption,
        ...customComponents,
      }),
      [customComponents],
    );

    return React.createElement(ReactSelect, {
      classNamePrefix: 'react-select',
      options: options,
      onChange: handleChange,
      isSearchable: true,
      defaultValue: selectedOption,
      value: selectedOption,
      isDisabled: disabled,
      components: selectComponents,
      noOptionsMessage: ({ inputValue }: any) =>
        inputValue
          ? 'Sorry, no options \n matched your criteria.'
          : 'Sorry, no options for now',
      hasErrors: hasErrors,
      defaultStyles: false,
      menuPortalTarget: document.body,
      ...innerProps,
    } as any);
  },
);

SelectBase.displayName = 'SelectBase';

export default SelectBase;
