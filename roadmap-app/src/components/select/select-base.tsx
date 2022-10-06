import React, { useMemo, memo } from 'react';

import { InputAdornment, IconButton } from '@material-ui/core';
import {
  default as ReactSelect,
  components,
  OptionProps,
  Props,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { ReactComponent as NavigateDownIcon } from 'assets/icons/navigate_down.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import Tooltip from 'components/tooltip';

import SelectItem from './select-item';
import ValueContainerWithIcon from './value-container-with-icon';

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
        <Tooltip title="Clear field">
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </InputAdornment>
    </components.ClearIndicator>
  );
};

export interface SelectOption extends OptionProps<any, false> {
  value?: any;
  icon: React.FunctionComponent<any>;
}

export interface SelectOptionsMap {
  [key: string]: SelectOption;
}

export interface SelectConfig extends Props {
  options: SelectOption[];
  optionsMap: SelectOptionsMap;
  initialValue?: number | string;
}

const filterOptionsByStart = (candidate: any, input: any) =>
  candidate.label
    .toLocaleLowerCase()
    .startsWith(input.toLocaleLowerCase());

interface SelectBaseProps extends SelectConfig {
  value: any;
  hasErrors?: boolean;
  handleChange(option: any): void;

  classNamePrefix?: string | null;
  disabled?: boolean;
  isLoading?: boolean;
  isTableSelectStyles?: boolean;
  isAbsoluteMenu?: boolean | null;
  isFilterOptionByStart?: boolean;
}

const SelectBase: React.FunctionComponent<SelectBaseProps> = memo(
  ({
    isCreatable,
    classNamePrefix,
    optionsMap,
    options = [],
    disabled,
    components: customComponents = {},
    isLoading = false,
    isMulti,
    isAbsoluteMenu = true,
    isFilterOptionByStart,

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
      if (isMulti && Array.isArray(value)) {
        return (value as any[]).map(getOption);
      } else {
        return getOption(value);
      }
    }, [isMulti, value, optionsMap, options]);

    const selectComponents = useMemo(
      () => ({
        DropdownIndicator,
        ClearIndicator,
        Option: CustomOption,
        ValueContainer: ValueContainerWithIcon,
        ...customComponents,
      }),
      [customComponents],
    );

    return React.createElement(
      isCreatable ? CreatableSelect : ReactSelect,
      {
        classNamePrefix: classNamePrefix || 'react-select',
        isLoading: isLoading,
        options: options,
        onChange: handleChange,
        isSearchable: isCreatable,
        defaultValue: selectedOption,
        value: selectedOption,
        isDisabled: disabled || isLoading,
        isMulti,
        components: selectComponents,
        noOptionsMessage: ({ inputValue }: any) =>
          inputValue
            ? 'Sorry, no options \n matched your criteria.'
            : 'Sorry, no options for now',
        hasErrors: hasErrors,
        defaultStyles: false,
        menuPortalTarget: isAbsoluteMenu ? document.body : undefined,
        filterOption: isFilterOptionByStart
          ? filterOptionsByStart
          : undefined,
        ...innerProps,
      } as any,
    );
  },
);

SelectBase.displayName = 'SelectBase';

export default SelectBase;
