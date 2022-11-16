import React, { memo, useMemo, useCallback } from 'react';
import { FormControl, InputLabel } from '@material-ui/core';
import { get } from 'lodash';

import DatePicker from 'components/date-picker';

import { checkFieldForErrors } from '../field';

const DatePickerField: React.FunctionComponent = memo(
  (props: any) => {
    const {
      name,
      formik = { values: {} },
      label,
      ...restProps
    } = props;
    const { values, setFieldValue } = formik;
    const value = get(values, name, '');
    const hasErrors = useMemo(
      () => checkFieldForErrors(name, formik),
      [formik, name],
    );

    const handleChange = useCallback(
      (value) => {
        setFieldValue(name, value, hasErrors);
      },
      [setFieldValue, name, hasErrors],
    );

    const date = value ? new Date(value) : null;

    return (
      <FormControl>
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

        <DatePicker
          date={date}
          setDate={handleChange}
          hasError={hasErrors}
          {...restProps}
        />
      </FormControl>
    );
  },
);

DatePickerField.displayName = 'DatePickerField';

export default DatePickerField;
