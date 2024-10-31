import { cloneRuleGroupWithUpdatedIds, getDefaultRule, getDefaultRuleGroup } from 'src/utils';

import type { Path, Query, QueryBuilderActions, RuleGroupType, RuleType } from 'src/types';

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

const findRuleGroupByPath = (draftState: Query, path: Path): RuleGroupType | undefined => {
  let currentGroup: RuleGroupType | undefined = draftState;
  for (let index = 0; index < path.length; index++) {
    const activePath = path[index]!;
    const temp: RuleType | RuleGroupType | undefined = currentGroup.rules[activePath];
    if (temp && 'rules' in temp) {
      currentGroup = temp;
    } else {
      currentGroup = undefined;
      break;
    }
  }
  return currentGroup;
};

export const queryBuilderReducer = (draftState: Query, action: QueryBuilderActions): Query => {
  switch (action.type) {
    case 'add-rule': {
      const parentGroupPath = action.payload.path;
      const parentGroup = findParentRuleGroupByPath(draftState, parentGroupPath);
      if (parentGroup) {
        parentGroup.rules.push(getDefaultRule());
      }
      return draftState;
    }
    case 'add-rule-group': {
      const parentGroupPath = action.payload.path;
      const parentGroup = findParentRuleGroupByPath(draftState, parentGroupPath);
      if (parentGroup) {
        parentGroup.rules.push(getDefaultRuleGroup());
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
      return draftState;
    }
    case 'delete-rule-group': {
      const targetPath = action.payload.path;
      const targetIndex = targetPath.slice(-1)[0];
      const parentGroupPath = targetPath.slice(0, -1);
      const parentRuleGroup = findParentRuleGroupByPath(draftState, parentGroupPath);

      if (parentRuleGroup && targetIndex) {
        if (targetIndex >= 0 && targetIndex < parentRuleGroup.rules.length) {
          parentRuleGroup.rules.splice(targetIndex, 1);
        }
      }
      return draftState;
    }
    case 'ungroup-rule-group': {
      const targetPath = action.payload.path;
      const targetIndex = targetPath.slice(-1)[0];
      const parentGroupPath = targetPath.slice(0, -1);
      const toBeUngroupedRuleGroup = findParentRuleGroupByPath(draftState, targetPath);
      const parentRuleGroup = findParentRuleGroupByPath(draftState, parentGroupPath);

      if (parentRuleGroup && targetIndex && toBeUngroupedRuleGroup) {
        if (targetIndex >= 0 && targetIndex < parentRuleGroup.rules.length) {
          parentRuleGroup.rules.splice(targetIndex, 1, ...toBeUngroupedRuleGroup.rules);
        }
      }
      return draftState;
    }
    case 'lock-rule-group': {
      const targetPath = action.payload.path;
      const targetGroup = findRuleGroupByPath(draftState, targetPath);
      if (targetGroup) {
        targetGroup.locked = !targetGroup.locked;
      }
      return draftState;
    }
    default: {
      return draftState;
    }
  }
};
