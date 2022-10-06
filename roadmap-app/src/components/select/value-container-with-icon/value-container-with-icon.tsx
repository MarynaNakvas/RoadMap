import React from 'react';
import classNames from 'clsx';
import { components, ValueContainerProps } from 'react-select';

const ValueContainerWithIcon = (props: ValueContainerProps<any, false>) => {
  const {
    className,
    selectProps: { value },
  } = props;
  const label = value?.label;
  const Icon = value?.icon;
  const suffix = `${label}`.replace(/\s/g, '').toLowerCase();

  return (
    <>
      {!!Icon && (
        <Icon
          className={classNames(
            'select-item__icon',
            `select-item__icon_${suffix}`,
          )}
        />
      )}

      <components.ValueContainer
        className={classNames(
          'select-item__value',
          `select-item__value_${suffix}`,
          className,
        )}
        {...props}
      >
        {props.children}
      </components.ValueContainer>
    </>
  );
};

ValueContainerWithIcon.displayName = 'ValueContainer';

export default ValueContainerWithIcon;
