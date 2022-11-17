import React, {
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
  [key: string]: any;
}

const TextField: React.FunctionComponent<TextFieldProps> = memo(
  ({
    className,
    name = '',
    formik = {
      values: {},
      setFieldValue: () => {},
      handleBlur: () => {},
    },
    label,
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
        root: classNames(className, 'text-field'),
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
        setFieldValue(name, value, hasErrors);
      },
      [setFieldValue, name, hasErrors],
    );

    const handleClear = useCallback(() => {
      const value = '';
      setFieldValue(name, value, hasErrors);
    }, [setFieldValue, name, hasErrors]);

    const onBlur = useCallback(
      (e: any) => {
        formikHandleBlur(e);
      },
      [formikHandleBlur],
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
          onBlur={onBlur}
          onChange={handleChange}
          handleClear={handleClear}
          focusOnClear
        />
      </FormControl>
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;
