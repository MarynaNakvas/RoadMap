import React, { memo, useMemo } from 'react';
import { get } from 'lodash';

import { FilterProps } from 'utils/filtering';
import { setDate as getValueSetter } from 'utils/formik';

import DatePicker, { DatePickerProps } from './date-picker';

export interface FilterWithDatePickerProps
  extends Omit<DatePickerProps, 'date' | 'setDate' | 'defaultDate'> {
  filter: FilterProps<Date>;
  defaultDate?: Date | null;
}

const FilterWithDatePicker: React.FunctionComponent<
  FilterWithDatePickerProps
> = 
  memo(({ filter, defaultDate, ...otherProps }) => {
    const { date, setDate } = useMemo(() => {
      const setter = getValueSetter;
      return {
        date: get(filter, 'value', defaultDate) || defaultDate,
        setDate: (date: Date | undefined | null) => {
          if (setter) {
            setter(date, filter.setOption);
          }
        },
      };
    }, [filter, defaultDate]);

    return (
      <DatePicker
        {...otherProps}
        date={date}
        setDate={setDate}
        defaultDate={defaultDate}
      />
    );
  },
);

FilterWithDatePicker.displayName = 'FilterWithDatePicker';

export default FilterWithDatePicker;
