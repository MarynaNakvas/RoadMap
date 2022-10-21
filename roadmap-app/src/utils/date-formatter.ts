import { format } from 'date-fns';

export const DATE_FORMAT = {
  MMDDYYYY: 'MM/dd/yyyy',
};

export const DATETIME_FORMAT = {
  MMDDYYYYHHMMA: 'MM/dd/yyyy, hh:mm aa',
  ISO_WITHOUT_TZ: "yyyy-MM-dd'T'HH:mm:ss",
};

export const dateFormat = (
  date: Date,
  formatValue = DATE_FORMAT.MMDDYYYY,
) => format(date, formatValue);

export const dateTimeFormat = (
  date: Date,
  valueFormat = DATETIME_FORMAT.MMDDYYYYHHMMA,
) => format(date, valueFormat);

export const formatISOWithoutTZ = (date: Date) =>
  dateTimeFormat(date, DATETIME_FORMAT.ISO_WITHOUT_TZ);
