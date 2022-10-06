import React, { FunctionComponent, useMemo } from 'react';
import { get } from 'lodash';

import { FilterProps } from 'utils/filtering';
import { getSetter as getValueSetter } from 'utils/formik';

import DatePicker, { DatePickerProps } from './date-picker';

export interface FilterWithDatePickerProps
  extends Omit<DatePickerProps, 'date' | 'setDate' | 'defaultDate'> {
  type?: 'date' | 'time' | 'datetime';
  filter: FilterProps<Date>;
  defaultDate?: Date | null;
}

const FilterWithDatePicker: FunctionComponent<
  FilterWithDatePickerProps
> = ({ type = 'date', filter, defaultDate, ...otherProps }) => {
  const { date, setDate } = useMemo(() => {
    const setter = getValueSetter(type);
    return {
      date: get(filter, 'value', defaultDate) || defaultDate,
      setDate: (date: Date | undefined | null) => {
        if (setter) {
          setter(date, filter.setOption);
        }
      },
    };
  }, [type, filter, defaultDate]);

  return (
    <DatePicker
      {...otherProps}
      date={date}
      setDate={setDate}
      defaultDate={defaultDate}
    />
  );
};

FilterWithDatePicker.displayName = 'FilterWithDatePicker';

export default FilterWithDatePicker;
