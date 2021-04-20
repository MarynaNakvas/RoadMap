import { dateFormat } from 'utils/date-formater';
import { TableKeys, TableKeysType } from './roadmap.model';

export const normalizeData = (data: TableKeysType[]) =>
  data.map((item: TableKeysType) => {
    const { id, title, author, date, rating, isPriority } = item;

    return {
      [TableKeys.id]: id,
      [TableKeys.Title]: title,
      [TableKeys.Author]: author,
      [TableKeys.Date]: dateFormat(new Date(date)),
      [TableKeys.Rating]: rating,
      [TableKeys.isPriority]: isPriority,
    };
  });
