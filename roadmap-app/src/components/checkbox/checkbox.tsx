import React, { useCallback } from 'react';
import { Checkbox } from '@material-ui/core';
import { get } from 'lodash';
import { FormikProps } from 'formik';

interface CheckBoxProps {
  name: any;
  formik: FormikProps<any>;
  className: any;
}

const CheckBox = ({ name, formik, className }: CheckBoxProps) => {
  const { values, setFieldValue } = formik;
  const isChecked = get(values, name, false);

  const toggleChecked = useCallback(() => {
    console.log('toggle');

    setFieldValue(name, !isChecked);
  }, [name, isChecked, setFieldValue]);

  return (
    <Checkbox
      className={className}
      checked={isChecked}
      onChange={toggleChecked}
    />
  );
};

CheckBox.displayName = 'CheckBox';

export default CheckBox;
