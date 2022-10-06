import React, { useMemo } from 'react';

import { ReactComponent as NavigateNext } from 'assets/icons/navigate-next.svg';
import { ReactComponent as NavigateLast } from 'assets/icons/navigate-last.svg';

import { format } from 'date-fns';
import ActionItem from 'components/action-item';

import './date-picker-header.scss';

const DatePickerHeader: React.FunctionComponent<any> = ({
  date,
  decreaseMonth,
  increaseMonth,
  decreaseYear,
  increaseYear,
  nextRepresentation,
  showMonthYearPicker,
  withPrevNextButtons,
  showYearPicker,
}) => {
  const YearIconNavigateIcon = useMemo(
    () => (showMonthYearPicker ? NavigateNext : NavigateLast),
    [showMonthYearPicker],
  );
  const headerTitle = useMemo(
    () => format(date, showMonthYearPicker ? 'yyyy' : 'LLLL yyyy'),
    [date, showMonthYearPicker],
  );

  return (
    <div className="date-picker-header">
      {withPrevNextButtons && (
        <>
          <ActionItem
            icon={
              <YearIconNavigateIcon className="date-picker-header__icon date-picker-header__icon--decrease" />
            }
            onClick={decreaseYear}
            tooltip={
              showMonthYearPicker && showYearPicker
                ? 'Previous Years'
                : 'Previous Year'
            }
          />
          {!showMonthYearPicker && (
            <ActionItem
              icon={
                <NavigateNext className="date-picker-header__icon date-picker-header__icon--decrease" />
              }
              onClick={decreaseMonth}
              tooltip="Previous Month"
            />
          )}
        </>
      )}

      <div
        className="date-picker-header__date-wrapper"
        onClick={nextRepresentation}
      >
        <span className="date-picker-header__title">
          {headerTitle}
        </span>
      </div>

      {withPrevNextButtons && (
        <>
          {!showMonthYearPicker && (
            <ActionItem
              icon={
                <NavigateNext className="date-picker-header__icon date-picker-header__icon--increase" />
              }
              onClick={increaseMonth}
              tooltip="Next Month"
            />
          )}

          <ActionItem
            icon={
              <YearIconNavigateIcon className="date-picker-header__icon date-picker-header__icon--increase" />
            }
            onClick={increaseYear}
            tooltip={
              showMonthYearPicker && showYearPicker
                ? 'Next Years'
                : 'Next Year'
            }
          />
        </>
      )}
    </div>
  );
};

DatePickerHeader.displayName = 'DatePickerHeader';

export default DatePickerHeader;
