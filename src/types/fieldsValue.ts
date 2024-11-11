import type { Fields } from './fields';
import type { InputType } from './inputType';

export type FieldsValue = string | number | boolean | null | undefined | string[] | number[];

type ValueEditorType =
  | 'text'
  | 'switch'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'multiselect'
  | 'date'
  | 'datetime-local'
  | 'time'
  | null;

export type FieldsEditorProps = {
  title?: string;
  isDisabled: () => boolean | undefined;
  handleOnChange: (value: FieldsValue) => void;
  value: any;
  values?: any;
  valueEditorType?: ValueEditorType;
  listsAsArrays?: boolean;
  fieldData: Fields | undefined;
  inputType?: InputType | undefined | null;
  operator: string;
  separator?: string;
  selectorComponent: any;
};

export type CustomValueEditorProps = {
  fieldData: Fields | undefined;
  operator: string | null;
  value: string | null;
  handleOnChange: (value: FieldsValue) => void;
};
