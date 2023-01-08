import React, { memo, useCallback, useMemo } from 'react';
import { FormikProps } from 'formik';
import { FormControl, InputLabel } from '@material-ui/core';
import { get } from 'lodash';
import classNames from 'clsx';

import CheckboxButton from 'components/checkbox-button';

import { checkFieldForErrors } from '../field';

import './checkbox-field.scss';

interface CheckboxFieldProps {
  className?: string;
  formik: FormikProps<any>;
  name: string;
  label: string;

  // other props
  [key: string]: any;
}

const CheckboxField: React.FunctionComponent<CheckboxFieldProps> = memo(
  ({ className, formik, name, label, ...otherProps }) => {
    const controlClasses = useMemo(
      () => ({
        root: classNames(className, 'checkbox-field'),
      }),
      [className],
    );
    const isChecked = get(formik.values, name);
    const hasErrors = useMemo(
      () => checkFieldForErrors(name, formik),
      [formik.errors, name],
    );
    const onChange = useCallback(
      (isChecked?: boolean) => {
        formik.setFieldValue(name, isChecked, hasErrors);
      },
      [formik.setFieldValue, name, hasErrors],
    );

    return (
      <FormControl classes={controlClasses}>
        <CheckboxButton
          {...otherProps}
          isChecked={isChecked}
          handleChange={onChange}
          hasErrors={hasErrors}
        />

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
      </FormControl>
    );
  },
);

CheckboxField.displayName = 'CheckboxField';

export default CheckboxField;
