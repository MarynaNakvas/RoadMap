import React, {
  ReactNode,
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { format, isEqual } from 'date-fns';
import { Portal } from '@material-ui/core';
import classNames from 'clsx';
import ReactDatePicker, {
  ReactDatePickerProps,
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ActionItem from 'components/action-item';

import { ReactComponent as CalendarIconTable } from 'assets/icons/calendar-fill.svg';
import DatePickerHeader from './date-picker-header/date-picker-header';
import DatePickerInput from './date-picker-input';
import {
  CalendarRepresentation,
  representations,
} from './date-picker.config';

import './date-picker.scss';

type Representation =
  typeof CalendarRepresentation[keyof typeof CalendarRepresentation];

export interface DatePickerProps
  extends Partial<ReactDatePickerProps> {
  showCalendar?: boolean;
  date?: Date | null;
  setDate(date?: Date | null): void;
  withMonthSelecting?: boolean;
  withYearSelecting?: boolean;
  withTodayButton?: boolean;
  legend?: ReactNode;
  isTableView?: boolean;
  isFormView?: boolean;
  hasError?: boolean;
  isClearable?: boolean;
  formatOutput?(
    date: Date | undefined | null,
    option: {
      event: SyntheticEvent;
      representation: Representation;
    },
  ): Date | undefined | null;
  defaultRepresentation?: Representation;
  canUseNextRepresentation?: boolean;
  defaultDate?: Date | null;
  monthPickerFormat?: string | undefined;
  disabled?: boolean;
  onCalendarClose?: () => void;
  withPrevNextButtons?: boolean;
}

const DatePicker = ({
  date = null,
  setDate,
  formatOutput,
  showCalendar = true,
  withYearSelecting = false,
  withMonthSelecting = false,
  isTableView = false,
  isFormView = false,
  hasError = false,
  defaultDate = null,
  withTodayButton = true,
  legend,
  defaultRepresentation = CalendarRepresentation.DayPicker,
  canUseNextRepresentation = true,
  monthPickerFormat,
  disabled,
  isClearable = true,
  onCalendarClose,
  withPrevNextButtons = true,
  calendarClassName,
  ...restProps
}: DatePickerProps) => {
  const inputRef = useRef(null);
  const calendarFef = useRef(null);
  const defaultRepresentationIndex = useMemo(() => {
    switch (defaultRepresentation) {
      case CalendarRepresentation.YearPicker:
        return 2;
      case CalendarRepresentation.MonthPicker:
        return 1;
      default:
        return 0;
    }
  }, [defaultRepresentation]);
  const [representationIndex, setRepresentationIndex] = useState(
    defaultRepresentationIndex,
  );

  const { showYearPicker, showMonthYearPicker, shouldCloseOnSelect } =
    useMemo(() => {
      const calendarRepresentation =
        representations[representationIndex];

      switch (calendarRepresentation) {
        case CalendarRepresentation.MonthPicker:
          return {
            showYearPicker: false,
            showMonthYearPicker: true,
            shouldCloseOnSelect: withMonthSelecting,
          };
        case CalendarRepresentation.YearPicker:
          return {
            showYearPicker: true,
            showMonthYearPicker: true,
            shouldCloseOnSelect: withYearSelecting,
          };

        default:
          return {
            showYearPicker: false,
            showMonthYearPicker: false,
            shouldCloseOnSelect: true,
          };
      }
    }, [representationIndex, withMonthSelecting, withYearSelecting]);

  const handleClear = useCallback(
    (event: MouseEvent) => {
      if (event) {
        event.stopPropagation();
      }
      defaultDate ? setDate(defaultDate) : setDate(null);
    },
    [setDate],
  );

  const nextRepresentation = useCallback(() => {
    if (canUseNextRepresentation) {
      setRepresentationIndex((index) => {
        const nextIndex = index + 1;

        if (nextIndex === representations.length) {
          return index;
        }
        return nextIndex;
      });
    }
  }, [canUseNextRepresentation, setRepresentationIndex]);

  const prevRepresentation = useCallback(() => {
    setRepresentationIndex((index) => {
      if (!index) {
        return 0;
      }

      return index - 1;
    });
  }, [setRepresentationIndex]);

  const resetRepresentation = useCallback(() => {
    setRepresentationIndex(defaultRepresentationIndex);

    // Bypass calendar close.
    if (onCalendarClose) {
      onCalendarClose();
    }
  }, [
    setRepresentationIndex,
    defaultRepresentationIndex,
    onCalendarClose,
  ]);

  const onChange = useCallback(
    (date: Date, e: SyntheticEvent) => {
      const calendarRepresentation =
        representations[representationIndex];

      switch (calendarRepresentation) {
        case CalendarRepresentation.MonthPicker:
        case CalendarRepresentation.YearPicker:
          if (withMonthSelecting) {
            const output = formatOutput
              ? formatOutput(date, {
                  event: e,
                  representation: calendarRepresentation,
                })
              : date;
            setDate(output);
          } else {
            prevRepresentation();
          }
          break;
        default:
          const output = formatOutput
            ? formatOutput(date, {
                event: e,
                representation: calendarRepresentation,
              })
            : date;
          setDate(output);
          break;
      }
    },
    [
      setDate,
      formatOutput,
      representationIndex,
      prevRepresentation,
      withMonthSelecting,
    ],
  );

  const formatWeekDay = useCallback(
    (weekName: string) => weekName.slice(0, 3),
    [],
  );

  const renderCustomHeader = useCallback(
    (props: any) => (
      <DatePickerHeader
        showMonthYearPicker={showMonthYearPicker}
        nextRepresentation={nextRepresentation}
        withPrevNextButtons={withPrevNextButtons}
        {...props}
        showYearPicker={showYearPicker}
      />
    ),
    [nextRepresentation, showMonthYearPicker],
  );

  const todayButtonTitle = useMemo(() => {
    if (!withTodayButton) {
      return null;
    }
    const todayDate = format(new Date(), 'MM/dd/yyyy');

    return `Today ${todayDate}`;
  }, [withTodayButton]);

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
      !disabled &&
      showCalendar && (
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
  }, [
    calendarFef,
    inputRef,
    disabled,
    showCalendar,
    isTableView,
    isFormView,
  ]);

  const customInput = useMemo(
    () => (
      <DatePickerInput
        isClearable={isClearable}
        monthPickerFormat={monthPickerFormat}
        handleClear={handleClear}
        backsWordIcon={backsWordIcon}
        defaultDate={defaultDate}
      />
    ),
    [monthPickerFormat, handleClear, backsWordIcon, isClearable],
  );

  const isDateDefault =
    date == null || defaultDate == null
      ? date === defaultDate
      : isEqual(date, defaultDate);
  const defaultDateView =
    (!date || isDateDefault) && !isTableView && !isFormView;

  return (
    <div
      className={classNames('date-picker', {
        'date-picker--with-date': !isDateDefault,
        'date-picker--with-default-date':
          defaultDateView || isDateDefault,
        'date-picker--with-table-date': isTableView,
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
        showYearPicker={showYearPicker}
        onCalendarClose={resetRepresentation}
        renderCustomHeader={renderCustomHeader}
        showMonthYearPicker={showMonthYearPicker}
        shouldCloseOnSelect={shouldCloseOnSelect}
        {...restProps}
        onChange={onChange}
        calendarClassName={calendarClassName}
      >
        {legend}
      </ReactDatePicker>
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
