import React, {
  ComponentType,
  ChangeEvent,
  FunctionComponent,
  memo,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  IconButton,
  TextField as MUITextField,
  InputAdornment,
} from '@material-ui/core';
import { omit } from 'lodash';

import { ReactComponent as CloseIcon } from 'assets/icons/close-sm.svg';
import LoadingIndicator from 'components/loading-indicator';
import Tooltip from 'components/tooltip';
import { dateFormat } from 'utils/date-formatter';

interface TextFieldBaseProps {
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  value: any;
  onChange(arg: ChangeEvent<HTMLInputElement>): void;
  handleClear?(event: React.SyntheticEvent): void;
  disabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  isLimitExist?: boolean;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  withOnFocus?: boolean;
  focusOnClear?: boolean;
  backsWordIcon?: ComponentType | null;
  prefix?: ComponentType | null;
  suffix?: ComponentType | null;
  [key: string]: any;
}

const TextFieldBase: FunctionComponent<TextFieldBaseProps> = memo(
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
      isLoading = false,
      isClearable = true,
      isLimitExist = false,
      onFocus = () => {},
      withOnFocus = false,
      focusOnClear = false,
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
        if (focusOnClear && currentInputRef.current) {
          currentInputRef.current.focus();
        }
        if (handleClear) {
          handleClear(event);
        }
      },
      [focusOnClear, currentInputRef, handleClear],
    );

    const endAdornment = useMemo(
      () => (
        <>
          {isLoading && <LoadingIndicator />}
          {isClearable &&
            (!!value || value === 0) &&
            !disabled &&
            !isLoading && (
              <InputAdornment className="clear-button" position="end">
                {!hasDefaultDate && (
                  <Tooltip title="Clear field">
                    <IconButton onClick={onClear}>
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </InputAdornment>
            )}
          {BacksWordIcon && <BacksWordIcon />}
          {Suffix && <Suffix />}
        </>
      ),
      [
        isLoading,
        isClearable,
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

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        if (withOnFocus) {
          event.preventDefault();
          const textInput = event.target as HTMLInputElement;
          textInput.select();
        }
        onFocus(event);
      },
      [withOnFocus, onFocus],
    );

    const restProps = omit(props, [
      'isLoading',
      'handleClear',
      'backsWordIcon',
      'prefix',
      'suffix',
      'isClearable',
      'monthPickerFormat',
      'defaultDate',
    ]);

    const valueForRender = !isLimitExist ? value : null;

    return (
      <MUITextField
        {...restProps}
        inputRef={currentInputRef}
        disabled={disabled || isLoading}
        value={valueForRender == null ? '' : valueForRender}
        variant="outlined"
        onChange={onChange}
        InputProps={inputProps}
        InputLabelProps={inputLabelProps}
        onFocus={handleFocus}
      />
    );
  },
);

TextFieldBase.displayName = 'TextFieldBase';

export default TextFieldBase;
