import { get } from 'lodash';
import { isEqual } from 'date-fns';

import { TableKeys, Table, SortingProps } from 'core/roadmap/table.model';
import { stringCompareFunction } from 'utils/sorting';

export const TABLE_ROW_INITIAL_VALUES: Table = {
  [TableKeys.id]: null,
  [TableKeys.title]: '',
  [TableKeys.author]: '',
  [TableKeys.date]: '',
  [TableKeys.rating]: null,
  [TableKeys.isPriority]: false,
  [TableKeys.originIndex]: 0,
};

export const processData = (
  data: Table[],
  sortingRules: SortingProps,
  titleValue: string | undefined | null,
  authorValue: string | undefined | null,
  dateValue: Date | undefined | null,
  ratingValue: number | undefined | null,
) => {
  let items = data;

  if (
    titleValue != null ||
    authorValue != null ||
    dateValue != null ||
    ratingValue != null
  ) {
    items = items.filter((item) => {
      const title = get(item, TableKeys.title);
      const author = get(item, TableKeys.author);
      const rawDate = get(item, TableKeys.date);
      const date = new Date(rawDate);
      const rating = get(
        item,
        TableKeys.rating,
      );

      return (
        (titleValue
          ? title
              .toLocaleLowerCase()
              .includes(titleValue.toLocaleLowerCase())
          : true) &&
        (authorValue
          ? author
              .toLocaleLowerCase()
              .includes(authorValue.toLocaleLowerCase())
          : true) &&
        (dateValue
          ? isEqual(date, dateValue)
          : true) && 
        (ratingValue
          ? rating === Number(ratingValue)
          : true)
      );
    });
  }

  return items.slice().sort((leftItem, rightItem) => {
    // New items should not be sorted.
    const leftID = get(
      leftItem,
      TableKeys.id,
    );
    const rightID = get(
      rightItem,
      TableKeys.id,
    );
    if (leftID == null || rightID == null) {
      return 0;
    }

    const left = get(leftItem, sortingRules.id);
    const right = get(rightItem, sortingRules.id);

    return stringCompareFunction({
      left,
      right,
      isReversed: sortingRules.isReversed,
    });
  });
};

export const addRow = (
  data: Table[],
) => [
  {
    ...TABLE_ROW_INITIAL_VALUES,
    [TableKeys.originIndex]: 0,
  },
  ...data.map((item) => ({
    ...item,
    [TableKeys.originIndex]:
      get(item, TableKeys.originIndex) + 1,
  })),
];

export const removeRow = (
  data: Table[],
  originIndex: number,
) =>
  data
    .filter(
      (item) =>
        get(item, TableKeys.originIndex) !== originIndex,
    )
    .map((item, index) => ({
      ...item,
      [TableKeys.originIndex]: index,
    }));
