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

export type QueryBuilderActions = Add_Rule | Add_Rule_Group;
