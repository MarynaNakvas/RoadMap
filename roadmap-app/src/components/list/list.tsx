import React from 'react';

import './list.scss';

export interface ListProps {
  data: {};
  isOpen: boolean;
}

const List = ({ data, isOpen }: ListProps) => {
  const listContent = Object.values(data).map((item: any) => (
    <li className="ordered-list__item" key={item}>
      {item}
    </li>
  ));

  return (
    <div className={isOpen ? 'list' : 'list-close'}>
      <ol className="ordered-list">{listContent}</ol>
    </div>
  );
};

List.displayName = 'List';

export default List;
