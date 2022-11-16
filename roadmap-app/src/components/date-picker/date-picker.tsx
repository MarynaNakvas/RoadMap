import React, {
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { format, isEqual } from 'date-fns';
import { Portal } from '@material-ui/core';
import classNames from 'clsx';
import ReactDatePicker, {
  ReactDatePickerProps,
  ReactDatePickerCustomHeaderProps,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ActionItem from 'components/action-item';

import { ReactComponent as CalendarIconTable } from 'assets/icons/calendar-fill.svg';
import DatePickerHeader from './date-picker-header/date-picker-header';
import DatePickerInput from './date-picker-input';

import './date-picker.scss';

export interface DatePickerProps
  extends Partial<ReactDatePickerProps> {
  date?: Date | null;
  setDate(date?: Date | null): void;
  legend?: ReactNode;
  hasError?: boolean;
  defaultDate?: Date | null;
  disabled?: boolean;
  isFormView?: boolean;
  onCalendarClose?: () => void;
}

const DatePicker = memo(
  ({
    date = null,
    setDate,
    legend,
    hasError = false,
    defaultDate = null,
    disabled,
    isFormView = false,
    onCalendarClose,
    calendarClassName,
    ...restProps
  }: DatePickerProps) => {
    const inputRef = useRef(null);
    const calendarFef = useRef(null);

    const handleClear = useCallback(
      (event: MouseEvent) => {
        if (event) {
          event.stopPropagation();
        }
        defaultDate ? setDate(defaultDate) : setDate(null);
      },
      [setDate],
    );

    const onChange = useCallback((date: Date) => setDate(date), [
      setDate,
    ]);

    const formatWeekDay = useCallback(
      (weekName: string) => weekName.slice(0, 3),
      [],
    );

    const renderCustomHeader = useCallback(
      (props: ReactDatePickerCustomHeaderProps) => (
        <DatePickerHeader {...props} />
      ),
      [],
    );

    const todayButtonTitle = useMemo(() => {
      const todayDate = format(new Date(), 'MM/dd/yyyy');
      return `Today ${todayDate}`;
    }, []);

    const backsWordIcon = useCallback(() => {
      const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        const calendarInstance = calendarFef?.current as any;

        if (calendarInstance) {
          const isCalendarOpen = calendarInstance.isCalendarOpen();

          calendarInstance.setOpen(!isCalendarOpen);
        }
      };

      return (
        !disabled && (
          <ActionItem
            icon={
              <CalendarIconTable
                ref={inputRef}
                className="close-calendar-icon"
                onClick={onClick}
              />
            }
            onClick={onClick}
            tooltip={'Calendar'}
          />
        )
      );
    }, [calendarFef, inputRef, disabled]);

    const customInput = useMemo(
      () => (
        <DatePickerInput
          handleClear={handleClear}
          backsWordIcon={backsWordIcon}
          defaultDate={defaultDate}
        />
      ),
      [handleClear, backsWordIcon, defaultDate],
    );

    const isDateDefault =
      date == null || defaultDate == null
        ? date === defaultDate
        : isEqual(date, defaultDate);
    const defaultDateView = !date || isDateDefault;

    return (
      <div
        className={classNames('date-picker', {
          'date-picker--with-date': !isDateDefault,
          'date-picker--with-default-date':
            defaultDateView || isDateDefault,
          'date-picker--with-form-date': isFormView,
          'date-picker--with-error': hasError,
        })}
      >
        <ReactDatePicker
          ref={calendarFef}
          disabled={disabled}
          fixedHeight
          selected={date}
          showPopperArrow={false}
          popperContainer={Portal}
          customInput={customInput}
          formatWeekDay={formatWeekDay}
          todayButton={todayButtonTitle}
          renderCustomHeader={renderCustomHeader}
          {...restProps}
          onChange={onChange}
          calendarClassName={calendarClassName}
        >
          {legend}
        </ReactDatePicker>
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
