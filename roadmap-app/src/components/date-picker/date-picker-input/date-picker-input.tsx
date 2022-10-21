import React, { ChangeEvent, memo } from 'react';
import NumberFormat from 'react-number-format';

import TextFieldBase from 'components/text-field-base';

const DatePickerInput = memo((props: any) => {
  const { onChange, value } = props;
  const changeDate = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/\d\d\/\d\d\/\d\d\d\d/)) {
      onChange(e);
    }
  };

  return (
    <NumberFormat
      {...props}
      onChange={changeDate}
      customInput={TextFieldBase}
      format="##/##/####"
      mask=" ."
      placeholder=". . / . . / . . . ."
    />
  );
});

DatePickerInput.displayName = 'DatePickerInput';

export default DatePickerInput;
