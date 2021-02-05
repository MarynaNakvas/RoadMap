import { TableKeysType } from 'core/roadmap';
import { remove } from 'lodash';

interface CheckDataPriorityProps {
  tableContent: TableKeysType[];
}

export const checkDataPriority = ({
  tableContent,
}: CheckDataPriorityProps) => {
  const dataList = [...tableContent];
  const dataPriority = dataList.filter(
    (rowData: TableKeysType) => rowData.isPriority,
  );
  dataPriority.map((item: any) =>
    remove(dataList, (n: any) => n.id === item.id),
  );
  return [...dataPriority, ...dataList];
};
