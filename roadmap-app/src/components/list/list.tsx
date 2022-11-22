import React, { useMemo } from 'react';

import './list.scss';

export interface ListProps {
  data?: {};
  byKey: string;
}

const List = ({ data, byKey }: ListProps) => {
  const listContent = useMemo(() => {
    const list = data && Object.values(data).map((item: any) => (
      <li className="ordered-list__item" key={item}>
        {item[byKey]}
      </li>
    ));

    return <ol className="ordered-list">{list}</ol>;
  }, [data]);

  return <div className="list">{listContent}</div>;
};

List.displayName = 'List';

export default List;
