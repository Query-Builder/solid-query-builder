import type { Path } from './base';
import type { Fields } from './fields';
import type { Operators } from './operators';
import type { FieldsValue } from './fieldsValue';
import type { Position } from './base';

type Add_Rule = {
  type: 'add-rule';
  payload: {
    path: Path;
  };
};

type Add_Rule_Group = {
  type: 'add-rule-group';
  payload: {
    path: Path;
    addSingleRuleToGroup: boolean;
  };
};

type Clone_Rule_Group = {
  type: 'clone-rule-group';
  payload: {
    path: Path;
  };
};

type Ungroup_Rule_Group = {
  type: 'ungroup-rule-group';
  payload: {
    path: Path;
  };
};

type Delete_Rule_Group = {
  type: 'delete-rule-group';
  payload: {
    path: Path;
  };
};

type Lock_Rule_Group = {
  type: 'lock-rule-group';
  payload: {
    path: Path;
  };
};

type Negate_Rule_Group = {
  type: 'negate-rule-group';
  payload: {
    path: Path;
  };
};

type Toggle_Combinator = {
  type: 'toggle-combinator';
  payload: {
    path: Path;
    // TODO: based on generics????
    value: string;
  };
};

type Change_Field = {
  type: 'set-field';
  payload: {
    path: Path;
    field: Fields | null;
  };
};

type Change_Operator = {
  type: 'set-operator';
  payload: {
    path: Path;
    operator: Operators | null;
  };
};

type Change_Field_Value = {
  type: 'set-field-value';
  payload: {
    path: Path;
    fieldValue: FieldsValue | null;
  };
};

type Lock_Rule = {
  type: 'lock-rule';
  payload: {
    path: Path;
  };
};

type Delete_Rule = {
  type: 'delete-rule';
  payload: {
    path: Path;
  };
};

type Negate_Rule = {
  type: 'negate-rule';
  payload: {
    path: Path;
  };
};

type Shift_Up = {
  type: 'shift-up';
  payload: {
    path: Path;
  };
};

type Shift_Down = {
  type: 'shift-down';
  payload: {
    path: Path;
  };
};

type Move_Rule = {
  type: 'move-rule';
  payload: {
    sourcePath: Path;
    destinationPath: Path;
    dropPosition: Position;
  };
};

type Clone_Rule = {
  type: 'clone-rule';
  payload: {
    path: Path;
  };
};

type RuleGroupActions =
  | Add_Rule
  | Add_Rule_Group
  | Clone_Rule_Group
  | Ungroup_Rule_Group
  | Delete_Rule_Group
  | Lock_Rule_Group
  | Negate_Rule_Group
  | Toggle_Combinator;

type RuleActions =
  | Lock_Rule
  | Delete_Rule
  | Negate_Rule
  | Clone_Rule
  | Move_Rule
  | Change_Field
  | Change_Operator
  | Change_Field_Value;

type CommonActions = Shift_Up | Shift_Down;

export type QueryBuilderActions = RuleGroupActions | RuleActions | CommonActions;
