import React, { useEffect } from 'react';

import Table from 'modules/table';

import './table.scss';

interface TablePageProps {
  title: string;
  setTitle(title: string): void;
}

const TablePage = ({ title, setTitle }: TablePageProps) => {
  useEffect(() => {
    setTitle(title);
  }, [title, setTitle]);

  return (
    <div className="table-container">
      <Table />
    </div>
  );
};

TablePage.displayName = 'TablePage';

export default TablePage;
