import { OptionProps } from 'core/roadmap';
import {
  dateFormat,
  formatISOWithoutTZ,
} from 'utils/date-formatter';

export const setDateWithFormat = (
  date: Date | undefined | null,
  setOption: (props: OptionProps | undefined | null) => void,
  formatter: (date: Date) => string,
) => {
  if (date) {
    setOption({
      label: formatter(date),
      value: date,
    });
  } else {
    setOption(undefined);
  }
};

export const setDateTime = (
  date: Date | undefined | null,
  setOption: (props: OptionProps | undefined | null) => void,
  formatter: (date: Date) => string = formatISOWithoutTZ,
) => setDateWithFormat(date, setOption, formatter);

export const setDate = (
  date: Date | undefined | null,
  setOption: (props: OptionProps | undefined | null) => void,
  formatter: (date: Date) => string = dateFormat,
) => setDateWithFormat(date, setOption, formatter);

export const getSetter = (type: 'date' | 'time' | 'datetime') => {
  switch (type) {
    case 'date':
      return setDate;
    case 'datetime':
      return setDateTime;
    default:
      return undefined;
  }
};
