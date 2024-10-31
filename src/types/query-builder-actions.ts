import { Path } from './base';

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

type RuleGroupActions =
  | Add_Rule
  | Add_Rule_Group
  | Clone_Rule_Group
  | Ungroup_Rule_Group
  | Delete_Rule_Group
  | Lock_Rule_Group;

export type QueryBuilderActions = RuleGroupActions;
