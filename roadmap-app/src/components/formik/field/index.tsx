import React, { memo } from 'react';
import { get, isEqual } from 'lodash';

import {
  checkFieldForErrors,
  withFieldType,
  withHelperText,
} from './helpers';

export * from './helpers';
export * from './helper-utils';

const areErrorsEqual = (prevProps: any, nextProps: any) => {
  /*
  ! TODO add get from lodash to errors check
  */
  const prevFormik = prevProps.formik;
  const nextFormik = nextProps.formik;

  const prevHasError = checkFieldForErrors(
    prevProps.name,
    prevFormik,
  );
  const nextHasError = checkFieldForErrors(
    nextProps.name,
    nextFormik,
  );

  return (
    prevHasError === nextHasError &&
    prevFormik.errors[nextProps.name] ===
      nextFormik.errors[nextProps.name]
  );
};

const areChildrenEqual = (prevProps: any, nextProps: any) =>
  prevProps.children === nextProps.children;

const areNamesEqual = (prevProps: any, nextProps: any) =>
  prevProps.name === nextProps.name;

const areLabelsEqual = (prevProps: any, nextProps: any) =>
  prevProps.label === nextProps.label;

const areLoadingStateEqual = (prevProps: any, nextProps: any) =>
  prevProps.isLoading === nextProps.isLoading;

const areOptionsEqual = (prevProps: any, nextProps: any) =>
  prevProps.options === nextProps.options;

const areActionsEqual = (prevProps: any, nextProps: any) =>
  prevProps.onInput === nextProps.onInput;

const areValuesEqual = (prevProps: any, nextProps: any) => {
  const prevValue = get(prevProps, `formik.values.${prevProps.name}`);
  const nextValue = get(nextProps, `formik.values.${nextProps.name}`);

  return isEqual(prevValue, nextValue);
};

const areStateEqual = (prevProps: any, nextProps: any) =>
  prevProps.disabled === nextProps.disabled;

const GenericField = (props: any) => {
  const { component: Component, name, ...restProps } = props;

  return (
    <Component
      key={`field-${name}`}
      id={`field-${name}`}
      name={name}
      {...restProps}
    />
  );
};

GenericField.displayName = 'GenericField';

export const SlowField = [withHelperText, withFieldType].reduce(
  (prev: any, fn: any) => fn && fn(prev),
  GenericField,
);

export const FastField = [
  (Component: any) =>
    memo(Component, (prevProps: any, nextProps: any) =>
      [
        areActionsEqual,
        areNamesEqual,
        areLabelsEqual,
        areValuesEqual,
        areChildrenEqual,
        areErrorsEqual,
        areStateEqual,
        areOptionsEqual,
        areLoadingStateEqual,
      ].every((areEqual) => areEqual(prevProps, nextProps)),
    ),
  withHelperText,
  withFieldType,
].reduce((prev: any, fn: any) => fn && fn(prev), GenericField);

export default FastField;
