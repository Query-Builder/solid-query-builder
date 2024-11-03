import type { ValueEditorType } from './valueEditorType';
import type { InputType } from './inputType';
import type { Option } from './options';
import type { RuleValidator } from './validation';
import type { OperatorsList } from './operators';

export type Fields = {
  name: string;
  label: string;
  placeholder?: string | null;
  id?: string;
  datatype?: string;
  operators?: OperatorsList | null;
  valueEditorType?: ValueEditorType;
  inputType?: InputType | null;
  values?: Option<string>;
  defaultOperator?: string;
  defaultValue?: any;
  validator?: RuleValidator;
  separator?: string;
  title?: string;
  listAsArrays?: boolean;
  comparator?: string;
};
