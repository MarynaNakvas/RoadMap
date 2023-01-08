import { v4 as createUID } from 'uuid';
import { get, pick } from 'lodash';

import { updateUnorderedList } from 'utils/redux-saga';
import { TableKeys, Table } from './table.model';

export const normalizeData = (data: any) =>
  data.map(([key, value]: any, index: number) => {
    const { id, title, author, date, rating, isPriority } = value;

      return {
        [TableKeys.id]: id,
        [TableKeys.title]: title,
        [TableKeys.author]: author,
        [TableKeys.date]: date,
        [TableKeys.rating]: rating,
        [TableKeys.isPriority]: isPriority,
        [TableKeys.key]: key,
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
    TableKeys.id,
  );

  return {
    added: data.added,
    updated: data.updated,
    removed: data.removed,
  };
};
