import { useMemo, useState } from 'react';
import { remove, flattenDeep } from 'lodash';

export const useSortData = (items: any, dataPriority: any) => {
  const [sortRules, setSortRules] = useState(items);
  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortRules !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortRules.dataKey] < b[sortRules.dataKey]) {
          return sortRules.direction === 'increase' ? -1 : 1;
        }
        if (a[sortRules.dataKey] > b[sortRules.dataKey]) {
          return sortRules.direction === 'increase' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortRules]);

  const sortData = (dataKey: string) => {
    let direction = 'increase';

    if (
      sortRules &&
      sortRules.dataKey === dataKey &&
      sortRules.direction === 'increase'
    ) {
      direction = 'decrease';
    }
    setSortRules({ dataKey, direction });
  };

  const dataPriorityArray = Array.from(dataPriority);
  const priorityRowsArray = dataPriorityArray.map((i: any) =>
    remove(sortedItems, (n: any) => n.id === i),
  );
  const priorityRows = flattenDeep(priorityRowsArray);
  const newUpdateTableContent = [...priorityRows, ...sortedItems];

  return { items: newUpdateTableContent, sortData, sortRules };
};
