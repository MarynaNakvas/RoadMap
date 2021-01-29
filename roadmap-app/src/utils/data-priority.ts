import { TableKeysType } from 'core/roadmap';
import { remove, flattenDeep } from 'lodash';

interface CheckDataPriorityProps {
  dataPriority: Set<string>;
  tableContent: TableKeysType[];
}

export const checkDataPriority = ({
  dataPriority,
  tableContent,
}: CheckDataPriorityProps) => {
  const dataPriorityArray = Array.from(dataPriority);
  const priorityRowsArray = dataPriorityArray.map((i: any) =>
    remove(tableContent, (n: any) => n.id === i),
  );
  const priorityRows = flattenDeep(priorityRowsArray);

  return [...priorityRows, ...tableContent];
};
