import React, {
  ComponentType,
  FunctionComponent,
  memo,
  useCallback,
  useMemo,
} from 'react';
import { FormControl, InputLabel } from '@material-ui/core';
import { FormikProps } from 'formik';
import { get } from 'lodash';
import classNames from 'clsx';

import TextFieldBase from 'components/text-field-base';

import { checkFieldForErrors } from '../field';

import './text-field.scss';

export interface TextFieldProps {
  className?: string;
  name?: string;
  formik?: FormikProps<any>;
  label?: string;
  ViewDetail?: ComponentType;
  InputProps: any;
  handleBlur?: () => void;
  disabled?: boolean;
  validateOnBlur?: boolean;
  withOnFocus?: boolean;
  isLabelOnLeft?: boolean;
  [key: string]: any;
}

const TextField: FunctionComponent<TextFieldProps> = memo(
  ({
    className,
    name = '',
    formik = {
      values: {},
      setFieldValue: () => {},
      handleBlur: () => {},
    },
    label,
    ViewDetail,
    InputProps,
    handleBlur,
    disabled = false,
    validateOnBlur = false,
    withOnFocus = false,
    isLabelOnLeft = false,
    ...otherProps
  }) => {
    const {
      values,
      setFieldValue,
      handleBlur: formikHandleBlur,
    } = formik;
    const field = get(values, name, '');

    const controlClasses = useMemo(
      () => ({
        root: classNames(className, 'text-field', {
          'text-field--label-on-left': isLabelOnLeft,
        }),
      }),
      [className],
    );

    const hasErrors = useMemo(
      () => checkFieldForErrors(name, formik),
      [formik, name],
    );

    const handleChange = useCallback(
      ({
        target: { value },
      }: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(name, value, validateOnBlur || hasErrors);
      },
      [setFieldValue, name, hasErrors, validateOnBlur],
    );

    const handleClear = useCallback(() => {
      let value = get(InputProps, 'inputProps.defaultValue');
      if (value == null) {
        value = '';
      }
      setFieldValue(name, value, validateOnBlur || hasErrors);
    }, [setFieldValue, name, InputProps, validateOnBlur, hasErrors]);

    const onBlur = useCallback(
      (e: any) => {
        if (handleBlur) {
          handleBlur();
        }
        formikHandleBlur(e);
      },
      [handleBlur, formikHandleBlur],
    );

    return (
      <FormControl classes={controlClasses}>
        <div className="text-field__label">
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

          {ViewDetail && <ViewDetail />}
        </div>

        <TextFieldBase
          {...otherProps}
          className={classNames(
            { 'text-field--with-error': hasErrors },
            className,
          )}
          name={name}
          value={field}
          error={hasErrors}
          disabled={disabled}
          InputProps={InputProps}
          onBlur={onBlur}
          onChange={handleChange}
          handleClear={handleClear}
          withOnFocus={withOnFocus}
          focusOnClear
        />
      </FormControl>
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;
