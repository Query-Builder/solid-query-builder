import type { FieldsValue } from './fieldsValue';

export type RuleType = {
  id: string | null;
  field: string | null;
  fieldValue: FieldsValue;
  operator: string | null;
  locked?: boolean;
  not?: boolean;
};
