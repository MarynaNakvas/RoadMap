import { v4 as createUID } from 'uuid';
import { get, pick } from 'lodash';

import { dateFormat } from 'utils/date-formatter';
import { updateUnorderedList } from 'utils/redux-saga';
import { TableKeys, Table } from './table.model';

export const normalizeData = (data: Table[]) =>
  data.map((item, index) => {
    const { id, title, author, date, rating, isPriority } = item;

    return {
      [TableKeys.id]: id,
      [TableKeys.title]: title,
      [TableKeys.author]: author,
      [TableKeys.date]: dateFormat(new Date(date)),
      [TableKeys.rating]: rating,
      [TableKeys.isPriority]: isPriority,
      [TableKeys.originIndex]: index,
    };
  });

const serializeEntryForSubmit = (
  values: Table[],
) =>
  values.map((entry) => ({
    id: get(entry, TableKeys.id),
    ...pick(entry, [
      TableKeys.title,
      TableKeys.author,
      TableKeys.date,
      TableKeys.rating,
      TableKeys.isPriority,
    ]),
  }));

export const serializeEntriesForSubmit = (
  values: Table[],
  initialValues: Table[],
) => {
  const currentEntries = values.map(
    (entry) => {
      const id = get(entry, TableKeys.id);
      if (!id) {
        return {
          ...entry,
          id: createUID(),
        } as Table;
      }
      return entry;
    },
  );
  const data = updateUnorderedList<any>(
    serializeEntryForSubmit(
      initialValues,
    ),
    serializeEntryForSubmit(
      currentEntries,
    ),
    'id',
  );

  return {
    updated: [...data.added, ...data.updated],
    removed: data.removed,
  };
};
