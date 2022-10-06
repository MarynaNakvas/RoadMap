import React, { ChangeEvent, memo, useCallback } from 'react';
import { Checkbox } from '@material-ui/core';
import classNames from 'clsx';

import './checkbox-button.scss';

interface CheckboxButtonProps {
  className?: string;
  isChecked?: boolean;
  handleChange(isChecked?: boolean): void;
  hasErrors?: boolean;
  readOnly?: boolean;
  disabled?: boolean;

  // other props
  [key: string]: any;
}

const CheckboxButton: React.FunctionComponent<CheckboxButtonProps> =
  memo(
    ({
      className,
      isChecked,
      handleChange,
      hasErrors,
      readOnly,
      disabled,
      ...otherProps
    }) => {
      const isEnabled = !readOnly && !disabled;

      const onChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
          if (isEnabled) {
            handleChange(event.target.checked);
          }
        },
        [isEnabled, handleChange],
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
          readOnly={readOnly}
          disabled={disabled}
        />
      );
    },
  );

CheckboxButton.displayName = 'CheckboxButton';

export default CheckboxButton;
