import { format } from 'date-fns';

export const dateFormat = (date: Date, formatValue = 'MM/dd/yyyy') =>
  format(date, formatValue);
