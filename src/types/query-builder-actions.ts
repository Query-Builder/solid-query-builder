import { type Path } from './base';

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

type RuleGroupActions =
  | Add_Rule
  | Add_Rule_Group
  | Clone_Rule_Group
  | Ungroup_Rule_Group
  | Delete_Rule_Group
  | Lock_Rule_Group
  | Negate_Rule_Group
  | Toggle_Combinator;

type RuleActions = Lock_Rule | Delete_Rule | Negate_Rule;

type CommonActions = Shift_Up | Shift_Down;

export type QueryBuilderActions = RuleGroupActions | RuleActions | CommonActions;
