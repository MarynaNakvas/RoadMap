import { dateFormat } from 'utils/date-formater';
import { TableKeys } from './roadmap.model';

export const normalizeData = (data: any) =>
  data.map((item: any) => {
    const { id, title, author, date, raiting } = item;

    return {
      [TableKeys.id]: id,
      [TableKeys.Title]: title,
      [TableKeys.Author]: author,
      [TableKeys.Date]: dateFormat(new Date(date)),
      [TableKeys.Raiting]: raiting,
    };
  });
