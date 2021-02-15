import React, { useMemo } from 'react';

import './list.scss';

export interface ListProps {
  data: {};
}

const List = ({ data }: ListProps) => {
  const listContent = useMemo(() => {
    const list = Object.values(data).map((item: any) => (
      <li className="ordered-list__item" key={item}>
        {item}
      </li>
    ));

    return <ol className="ordered-list">{list}</ol>;
  }, [data]);

  return <div className="list">{listContent}</div>;
};

List.displayName = 'List';

export default List;
