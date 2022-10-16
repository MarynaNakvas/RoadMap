import React, {
  ComponentType,
  ChangeEvent,
  memo,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  TextField as MUITextField,
  InputAdornment,
} from '@material-ui/core';
import { omit } from 'lodash';

import { ReactComponent as CloseIcon } from 'assets/icons/close-sm.svg';
import ActionItem from 'components/action-item';
import { dateFormat } from 'utils/date-formatter';

interface TextFieldBaseProps {
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  value: any;
  onChange(arg: ChangeEvent<HTMLInputElement>): void;
  handleClear?(event: React.SyntheticEvent): void;
  disabled?: boolean;
  backsWordIcon?: ComponentType | null;
  prefix?: ComponentType | null;
  suffix?: ComponentType | null;
  [key: string]: any;
}

const TextFieldBase: React.FunctionComponent<TextFieldBaseProps> = memo(
  (props) => {
    const {
      inputRef,
      value,
      onChange,
      disabled,
      InputProps,
      handleClear,
      InputLabelProps,
      defaultDate,
      backsWordIcon: BacksWordIcon,
      prefix: Prefix,
      suffix: Suffix,
    } = props;

    const defaultInputRef = useRef<HTMLInputElement | null>(null);
    const currentInputRef = inputRef || defaultInputRef;

    const hasDefaultDate = defaultDate
      ? value === dateFormat(defaultDate)
      : false;
    const inputLabelProps = useMemo(
      () => ({
        ...InputLabelProps,
        disableAnimation: true,
        shrink: true,
      }),
      [InputLabelProps],
    );

    const startAdornment = useMemo(
      () => (Prefix ? <Prefix /> : undefined),
      [Prefix],
    );

    const onClear = useCallback(
      (event: React.SyntheticEvent) => {
        if (currentInputRef.current) {
          currentInputRef.current.focus();
        }
        if (handleClear) {
          handleClear(event);
        }
      },
      [currentInputRef, handleClear],
    );

    const endAdornment = useMemo(
      () => (
        <>
          {(!!value || value === 0) &&
            !disabled && (
              <InputAdornment className="clear-button" position="end">
                {!hasDefaultDate && (
                  <ActionItem
                    icon={
                      <CloseIcon />
                    }
                    onClick={onClear}
                    tooltip={'Clear field'}
                  />
                )}
              </InputAdornment>
            )}
          {BacksWordIcon && <BacksWordIcon />}
          {Suffix && <Suffix />}
        </>
      ),
      [
        value,
        disabled,
        onClear,
        BacksWordIcon,
        Suffix,
      ],
    );

    const inputProps = useMemo(
      () => ({
        ...InputProps,
        notched: false,
        startAdornment,
        endAdornment,
      }),
      [InputProps, startAdornment, endAdornment],
    );

    const restProps = omit(props, [
      'isLoading',
      'handleClear',
      'backsWordIcon',
      'prefix',
      'suffix',
      'isClearable',
      'defaultDate',
    ]);

    return (
      <MUITextField
        {...restProps}
        inputRef={currentInputRef}
        disabled={disabled}
        value={value}
        variant="outlined"
        onChange={onChange}
        InputProps={inputProps}
        InputLabelProps={inputLabelProps}
        // onFocus={handleFocus}
      />
    );
  },
);

TextFieldBase.displayName = 'TextFieldBase';

export default TextFieldBase;
