import React, { FunctionComponent, memo, useMemo } from 'react';

import TextField, { TextFieldProps } from '../text-field';
import ReactNumberFormat from './react-number-format';

export type NumberFieldProps = TextFieldProps;

const NumberField: FunctionComponent<NumberFieldProps> = memo(
  (props) => {
    const { InputProps, ...otherProps } = props;

    const inputProps = useMemo(
      () => ({
        ...InputProps,
        inputComponent: ReactNumberFormat,
      }),
      [InputProps],
    );

    return <TextField {...otherProps} InputProps={inputProps} />;
  },
);

NumberField.displayName = 'NumberField';

export default NumberField;
