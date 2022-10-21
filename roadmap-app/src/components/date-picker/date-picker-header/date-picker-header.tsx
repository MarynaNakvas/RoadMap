import React, { memo, useMemo } from 'react';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { format } from 'date-fns';

import { ReactComponent as NavigateNext } from 'assets/icons/navigate-next.svg';
import { ReactComponent as NavigateLast } from 'assets/icons/navigate-last.svg';
import ActionItem from 'components/action-item';

import './date-picker-header.scss';

const DatePickerHeader: React.FunctionComponent<ReactDatePickerCustomHeaderProps> = memo(
  ({
    date,
    decreaseMonth,
    increaseMonth,
    decreaseYear,
    increaseYear,
  }) => {
    // const YearIconNavigateIcon = useMemo(
    //   () => (showMonthYearPicker ? NavigateNext : NavigateLast),
    //   [showMonthYearPicker],
    // );
    const headerTitle = useMemo(() => format(date, 'LLLL yyyy'), [
      date,
    ]);

    return (
      <div className="date-picker-header">
        <>
          <ActionItem
            icon={
              <NavigateNext className="date-picker-header__icon date-picker-header__icon--decrease" />
            }
            onClick={decreaseYear}
            tooltip="Previous Year"
          />
          <ActionItem
            icon={
              <NavigateLast className="date-picker-header__icon date-picker-header__icon--decrease" />
            }
            onClick={decreaseMonth}
            tooltip="Previous Month"
          />
        </>

        <div className="date-picker-header__date-wrapper">
          <span className="date-picker-header__title">
            {headerTitle}
          </span>
        </div>

        <>
          <ActionItem
            icon={
              <NavigateNext className="date-picker-header__icon date-picker-header__icon--increase" />
            }
            onClick={increaseMonth}
            tooltip="Next Month"
          />

          <ActionItem
            icon={
              <NavigateLast className="date-picker-header__icon date-picker-header__icon--increase" />
            }
            onClick={increaseYear}
            tooltip="Next Year"
          />
        </>
      </div>
    );
  },
);

DatePickerHeader.displayName = 'DatePickerHeader';

export default DatePickerHeader;
