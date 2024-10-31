import { v4 as uuidv4 } from 'uuid';

import type { Path, Query, QueryBuilderActions, RuleGroupType, RuleType } from 'src/types';

const cloneRuleGroupWithUpdatedIds = (targetRuleGroup: RuleGroupType) => {
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

const findParentRuleGroupByPath = (draftState: Query, path: Path): RuleGroupType | undefined => {
  let parentGroup: RuleGroupType | undefined = draftState;
  if (path.length > 0) {
    // adding a new
    for (let index = 0; index < path.length; index++) {
      const activePath = path[index]!;
      const temp: RuleType | RuleGroupType | undefined = parentGroup.rules[activePath];
      if (temp) {
        if ('rules' in temp) {
          parentGroup = temp;
        } else {
          // in case If find a rule or an undefined state...
          parentGroup = undefined;
          break;
        }
      } else {
        // in case If find a rule or an undefined state...
        parentGroup = undefined;
        break;
      }
    }
  }
  return parentGroup;
};

export const queryBuilderReducer = (draftState: Query, action: QueryBuilderActions): Query => {
  switch (action.type) {
    case 'add-rule': {
      const parentGroupPath = action.payload.path;
      const parentGroup = findParentRuleGroupByPath(draftState, parentGroupPath);
      if (parentGroup) {
        parentGroup.rules.push({
          id: uuidv4(),
          field: 'new-rule-2',
          fieldValue: 'new-value-2',
          operator: '!=',
        });
      }
      return draftState;
    }
    case 'add-rule-group': {
      const parentGroupPath = action.payload.path;
      const parentGroup = findParentRuleGroupByPath(draftState, parentGroupPath);
      if (parentGroup) {
        parentGroup.rules.push({
          id: uuidv4(),
          combinator: 'AND',
          rules: [],
        });
      }
      return draftState;
    }
    case 'clone-rule-group': {
      const targetPath = action.payload.path;
      const targetIndex = action.payload.path.slice(-1)[0];
      const parentGroupPath = targetPath.slice(0, -1);
      const toBeClonedRuleGroup = findParentRuleGroupByPath(draftState, targetPath);
      const parentRuleGroup = findParentRuleGroupByPath(draftState, parentGroupPath);

      if (parentRuleGroup && targetIndex && toBeClonedRuleGroup) {
        if (targetIndex >= 0 && targetIndex < parentRuleGroup.rules.length) {
          parentRuleGroup.rules.splice(
            targetIndex + 1,
            0,
            cloneRuleGroupWithUpdatedIds(toBeClonedRuleGroup),
          );
        }
      }
      return { ...draftState };
    }
    default: {
      return draftState;
    }
  }
};
