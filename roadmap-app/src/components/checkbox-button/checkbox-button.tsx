import React, { ChangeEvent, memo, useCallback } from 'react';
import { Checkbox } from '@material-ui/core';
import classNames from 'clsx';

import './checkbox-button.scss';

interface CheckboxButtonProps {
  className?: string;
  isChecked?: boolean;
  handleChange(isChecked?: boolean): void;
  hasErrors?: boolean;
  disabled?: boolean;

  // other props
  [key: string]: any;
}

const CheckboxButton: React.FunctionComponent<CheckboxButtonProps> = memo(
  ({
    className,
    isChecked,
    handleChange,
    hasErrors,
    disabled,
    ...otherProps
  }) => {
    const onChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
          handleChange(event.target.checked);
        }
      },
      [disabled, handleChange],
    );

    return (
      <Checkbox
        {...otherProps}
        className={classNames(
          { 'checkbox-button--errors': hasErrors },
          'checkbox-button',
          className,
        )}
        checked={isChecked}
        onChange={onChange}
        readOnly={!disabled}
        disabled={disabled}
      />
    );
  },
);

CheckboxButton.displayName = 'CheckboxButton';

export default CheckboxButton;
