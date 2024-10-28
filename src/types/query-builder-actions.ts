type Action = {
  type: 'add-rule' | 'add-rule-group';
  payload: unknown;
};

export type QueryBuilderActions = Action;
