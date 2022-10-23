import React, { useEffect, memo } from 'react';

import TableComponent from 'modules/table';

import './table.scss';

interface TablePageProps {
  title: string;
  setTitle(title: string): void;
}

const TablePage: React.FunctionComponent<TablePageProps> = memo(
  ({ title, setTitle }: TablePageProps) => {
    // setTitle(title);
    const aaa = 'a';
  
    return (
      <div className="table-container">
        <TableComponent />
      </div>
    );
});

TablePage.displayName = 'TablePage';

export default TablePage;
