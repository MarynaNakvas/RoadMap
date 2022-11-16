import Select from 'components/select';

import CheckboxField from '../checkbox-field';
import DatePickerField from '../date-picker-field';
import NumberField from '../number-field';
import TextField from '../text-field';

export enum FieldComponentNames {
  select = 'select',
  checkbox = 'checkbox',
  datePicker = 'datePicker',
  numberField = 'numberField',
  text = 'text',
}

export const FIELD_COMPONENTS = {
  [FieldComponentNames.select]: Select,
  [FieldComponentNames.checkbox]: CheckboxField,
  [FieldComponentNames.datePicker]: DatePickerField,
  [FieldComponentNames.numberField]: NumberField,
  [FieldComponentNames.text]: TextField,
};
