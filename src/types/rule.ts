export type RuleType = {
  id: string;
  field: string | null;
  fieldValue: string | null;
  operator: string | null;
  locked?: boolean;
  not?: boolean
};
