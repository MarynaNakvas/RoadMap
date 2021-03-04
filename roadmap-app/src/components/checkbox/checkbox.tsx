import React, { useCallback } from 'react';
import { Checkbox } from '@material-ui/core';
import { ReactComponent as IconStar } from 'assets/icons/icon-star.svg';
import { get } from 'lodash';
import { FormikProps } from 'formik';
import './checkbox.scss';

interface CheckBoxProps {
  name: any;
  formik: FormikProps<any>;
  className: any;
}

const CheckBox = ({ name, formik, className }: CheckBoxProps) => {
  const { values, setFieldValue } = formik;
  const isChecked = get(values, name, false);

  const toggleChecked = useCallback(() => {
    setFieldValue(name, !isChecked);
  }, [name, isChecked, setFieldValue]);

  return (
    <Checkbox
      icon={<IconStar />}
      checkedIcon={<IconStar />}
      className={className}
      checked={isChecked}
      onChange={toggleChecked}
    />
  );
};

CheckBox.displayName = 'CheckBox';

export default CheckBox;
