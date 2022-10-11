import { dateFormat } from 'utils/date-formatter';
import { TableKeys, Table } from './table.model';

export const normalizeData = (data: Table[]) =>
  data.map((item) => {
    const { id, title, author, date, rating, isPriority } = item;

    return {
      [TableKeys.id]: id,
      [TableKeys.title]: title,
      [TableKeys.author]: author,
      [TableKeys.date]: dateFormat(new Date(date)),
      [TableKeys.rating]: rating,
      [TableKeys.isPriority]: isPriority,
    };
  });
