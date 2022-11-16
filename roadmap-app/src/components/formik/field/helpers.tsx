/* eslint-disable indent */
import React, { memo } from 'react';
import { get } from 'lodash';
import { FormHelperText } from '@material-ui/core';

import {
  FieldComponentNames,
  FIELD_COMPONENTS,
} from './helper-utils';

export const withHelperText = (Component: React.ComponentType) => ({
  helperText = null,
  name,
  formik,
  ...props
}: any) => {
  const hasErrors = checkFieldForErrors(name, formik);
  const errorMessage = getFieldErrors(name, formik);

  return (
    <>
      <Component name={name} formik={formik} {...props} />

      {hasErrors && (
        <FormHelperText variant="standard" error>
          {errorMessage}
        </FormHelperText>
      )}
      {!!helperText && !hasErrors && (
        <FormHelperText variant="standard">
          {helperText}
        </FormHelperText>
      )}
    </>
  );
};

export const getFieldErrors = (name: string, formik: any) => {
  if (formik == null) {
    return;
  }
  const errors = get(formik, `errors.${name}`, false);

  // Error can be one or for each value
  return Array.isArray(errors) ? errors.find(Boolean) : errors;
};

export const checkFieldForErrors = (name: string, formik: any) => {
  if (formik == null) {
    return false;
  }

  const touched = get(formik, `touched.${name}`, false);
  const errorMessage = getFieldErrors(name, formik);

  return Boolean(errorMessage) && touched;
};

export const withFieldType = (Component: React.ComponentType) =>
  // eslint-disable-next-line react/display-name
  memo(({ fieldType, ...props }: any) => {
    const type = fieldType as FieldComponentNames | undefined | null;
    const component = type
      ? FIELD_COMPONENTS[type]
      : FIELD_COMPONENTS.text;
    return <Component {...props} component={component} />;
  });
