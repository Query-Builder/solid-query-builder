import { v4 as uuidv4 } from 'uuid';

import type { RuleGroupType, RuleType } from 'src/types';

export const cloneRuleGroupWithUpdatedIds = (targetRuleGroup: RuleGroupType) => {
  let clonedRuleGroup = { ...targetRuleGroup, id: uuidv4() };

  if (clonedRuleGroup.rules.length > 0) {
    clonedRuleGroup = {
      ...clonedRuleGroup,
      rules: clonedRuleGroup.rules.map(node => {
        if ('rules' in node) {
          return cloneRuleGroupWithUpdatedIds(node);
        } else {
          const _rule = node;
          return { ..._rule, id: uuidv4() } as RuleType;
        }
      }),
    };
  }

  return clonedRuleGroup;
};

export const getDefaultRuleGroup = (): RuleGroupType => ({
  id: uuidv4(),
  combinator: 'AND',
  locked: false,
  rules: [],
});

export const getDefaultRule = (): RuleType => ({
  id: uuidv4(),
  // TODO: default should be null.. or auto select...
  field: 'field-A',
  operator: 'operator-A',
  fieldValue: 'field-value-A',
  locked: false,
});
