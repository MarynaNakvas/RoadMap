import React, {
  SyntheticEvent,
  useCallback,
  useMemo,
  memo,
} from 'react';
import { get } from 'lodash';
import { FormikProps } from 'formik';
import { FormControl, InputLabel } from '@material-ui/core';
import { OptionProps, Props } from 'react-select';

import { checkFieldForErrors } from 'components/formik/field';

import { SelectBase } from '.';

export interface SelectOption extends OptionProps<any, false> {
  value?: any;
  icon: React.FunctionComponent<any>;
  sortOrder?: number;
}

export interface SelectOptionsMap {
  [key: string]: SelectOption;
}

export interface SelectConfig extends Props {
  options: SelectOption[];
  optionsMap: SelectOptionsMap;
  initialValue?: number | string;
}

interface SelectProps extends SelectConfig {
  label: string;
  name: string;
  formik: FormikProps<any>;
  className?: string;
  classNamePrefix?: string | null;
  disabled?: boolean;
  isLoading?: boolean;
  isTableSelectStyles?: boolean;
}

const Select: React.FunctionComponent<SelectProps> = memo(
  ({
    label,
    name,
    formik,
    className,
    onChange,
    isMulti,
    ...innerProps
  }) => {
    const {
      values,
      setFieldValue,
      handleBlur: formikHandleBlur,
    } = formik;
    const value = get(values, name);

    const controlClasses = useMemo(
      () => ({ root: className }),
      [className],
    );

    const hasErrors = useMemo(
      () => checkFieldForErrors(name, formik),
      [formik, name],
    );

    const handleChange = useCallback(
      (option: any) => {
        if (onChange) {
          onChange(option, {} as any);
        } else {
          let value = null;
          if (option != null) {
            if (isMulti && Array.isArray(option)) {
              value = (option as any[]).map(({ value }) => value);
            } else {
              value = option.value;
            }
          }
          setFieldValue(name, value, hasErrors);
        }
      },
      [onChange, isMulti, hasErrors, name, setFieldValue],
    );

    const handleBlur = useCallback(
      (event: SyntheticEvent) => {
        // Name in event target is required for formik touched handler.
        formikHandleBlur({
          ...event,
          target: {
            ...event.target,
            name,
          },
        });
      },
      [formikHandleBlur, name],
    );

    return (
      <FormControl classes={controlClasses}>
        {label && (
          <InputLabel
            variant="outlined"
            disableAnimation={true}
            shrink={true}
            error={hasErrors}
          >
            {label}
          </InputLabel>
        )}
        <SelectBase
          key={name}
          name={name}
          value={value}
          hasErrors={hasErrors}
          onBlur={handleBlur}
          handleChange={handleChange}
          isMulti={isMulti}
          {...innerProps}
        />
      </FormControl>
    );
  },
);

Select.displayName = 'Select';

export default Select;
