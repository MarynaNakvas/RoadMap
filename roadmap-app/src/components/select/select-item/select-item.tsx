import React from 'react';
import classNames from 'clsx';

import './select-item.scss';

interface SelectItemProps {
  id: number;
  label: string;
  icon?: React.FunctionComponent<any>;
}

const SelectItem: React.FunctionComponent<SelectItemProps> = ({
  id,
  label,
  icon: Icon,
}) => (
  <div className="select-item">
    {Icon && (
      <Icon
        className={classNames('select-item__icon', {
          [`select-item__icon_${`${label}`
            .replace(/\s/g, '')
            .toLowerCase()}`]: Icon,
        })}
      />
    )}
    <span
      className={classNames('select-item__status', {
        [`select-item__status_${`${label}`
          .replace(/\s/g, '')
          .toLowerCase()}`]: Icon,
      })}
    >
      {label}
    </span>
  </div>
);

SelectItem.displayName = 'SelectItem';

export default SelectItem;
