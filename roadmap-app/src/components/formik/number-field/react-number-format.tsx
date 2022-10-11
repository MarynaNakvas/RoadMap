import React, { RefObject, memo, useCallback } from 'react';
import {
  NumericFormat,
  NumberFormatValues,
} from 'react-number-format';

interface NumberFormatCustomProps {
  inputRef: (instance: RefObject<any> | null) => void;
  onChange: (event: {
    target: { name: string; value: string };
  }) => void;
  name: string;
  defaultValue: string | number | undefined;
  required?: boolean;
}

const ReactNumberFormat: React.FunctionComponent<NumberFormatCustomProps> = memo(
  ({ inputRef, onChange, name, defaultValue, required, ...other }) => {
  const onValueChange = useCallback(
    (values: NumberFormatValues) => {
      let value: number | string | null = values.value;

      // We need to convert value to the same type as defaultValue.
      const targetType = typeof defaultValue;
      if (typeof value != targetType) {
        if (!value && !required) {
          value = null;
        } else {
          const convert = targetType === 'string' ? String : Number;
          value = convert(value);
        }
      }

      onChange({
        target: {
          name,
          value: value as string,
        },
      });
    },
    [name, required],
  );

  const withThousandSeparator =
    name === 'numberFilterWithThousandSeparator';

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={onValueChange}
      thousandSeparator={withThousandSeparator}
    />
  );
});

ReactNumberFormat.displayName = 'ReactNumberFormat';

export default ReactNumberFormat;
