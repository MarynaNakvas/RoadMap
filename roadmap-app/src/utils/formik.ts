import { OptionProps } from 'core/roadmap';
import {
  dateFormat,
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

export const setDate = (
  date: Date | undefined | null,
  setOption: (props: OptionProps | undefined | null) => void,
  formatter: (date: Date) => string = dateFormat,
) => setDateWithFormat(date, setOption, formatter);
