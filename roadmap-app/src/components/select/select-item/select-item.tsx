import React from 'react';

import './select-item.scss';

interface SelectItemProps {
  id: number;
  label: string;
}

const SelectItem: React.FunctionComponent<SelectItemProps> = ({
  id,
  label,
}) => (
  <div className="select-item">
    <span className="select-item__status">
      {label}
    </span>
  </div>
);

SelectItem.displayName = 'SelectItem';

export default SelectItem;
