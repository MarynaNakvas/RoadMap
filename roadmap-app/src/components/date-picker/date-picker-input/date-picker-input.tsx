import React, { ChangeEvent, memo } from 'react';
import { NumericFormat } from 'react-number-format';
import { format } from 'date-fns';

import TextFieldBase from 'components/text-field-base';

const DatePickerInput = memo((props: any) => {
  const { onChange, monthPickerFormat, value } = props;
  const changeDate = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/\d\d\/\d\d\/\d\d\d\d/)) {
      onChange(e);
    }
  };

  if (value && monthPickerFormat) {
    const date = format(new Date(value), monthPickerFormat);

    return (
      <TextFieldBase
        {...props}
        disabled={true}
        value={date}
        className="date-picker-input__month-format"
      />
    );
  }

  return (
    <NumericFormat
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
