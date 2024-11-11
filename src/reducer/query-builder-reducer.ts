import { cloneRuleGroupWithUpdatedIds, getDefaultRule, getDefaultRuleGroup } from 'src/utils';

import type { Path, Query, QueryBuilderActions, RuleGroupType, RuleType } from 'src/types';

// const findParentRuleGroupByPath = (draftState: Query, path: Path): RuleGroupType | undefined => {
//   let parentGroup: RuleGroupType | undefined = draftState;
//   if (path.length > 0) {
//     // adding a new
//     for (let index = 0; index < path.length; index++) {
//       const activePath = path[index]!;
//       const temp: RuleType | RuleGroupType | undefined = parentGroup.rules[activePath];
//       if (temp) {
//         if ('rules' in temp) {
//           parentGroup = temp;
//         } else {
//           // in case If find a rule or an undefined state...
//           parentGroup = undefined;
//           break;
//         }
//       } else {
//         // in case If find a rule or an undefined state...
//         parentGroup = undefined;
//         break;
//       }
//     }
//   }
//   return parentGroup;
// };

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

const findRuleByPath = (draftState: Query, path: Path): RuleType | undefined => {
  let currentGroup: RuleGroupType | undefined = draftState;
  let rule: RuleType | undefined;

  for (let index = 0; index < path.length; index++) {
    const activePath = path[index]!;
    const temp: RuleType | RuleGroupType | undefined = currentGroup.rules[activePath];
    if (temp && 'rules' in temp) {
      currentGroup = temp;
    } else if (temp && !('rules' in temp)) {
      rule = temp;
      break;
    } else {
      rule = undefined;
      break;
    }
  }

  return rule;
};

export const queryBuilderReducer = (draftState: Query, action: QueryBuilderActions): Query => {
  switch (action.type) {
    case 'add-rule': {
      const parentGroupPath = action.payload.path;
      const parentGroup = findRuleGroupByPath(draftState, parentGroupPath);

      if (parentGroup) {
        parentGroup.rules.push(getDefaultRule());
      }

      return draftState;
    }
    case 'add-rule-group': {
      const parentGroupPath = action.payload.path;
      const addSingleRuleToGroup = action.payload.addSingleRuleToGroup;
      const parentGroup = findRuleGroupByPath(draftState, parentGroupPath);

      if (parentGroup) {
        parentGroup.rules.push(getDefaultRuleGroup(addSingleRuleToGroup));
      }

      return draftState;
    }
    case 'clone-rule-group': {
      const targetPath = action.payload.path;
      const targetIndex = action.payload.path.slice(-1)[0];
      const parentGroupPath = targetPath.slice(0, -1);
      const toBeClonedRuleGroup = findRuleGroupByPath(draftState, targetPath);
      const parentRuleGroup = findRuleGroupByPath(draftState, parentGroupPath);

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
      const targetIndex = targetPath.slice(-1)[0] ?? -1;
      const parentGroupPath = targetPath.slice(0, -1);
      const parentRuleGroup = findRuleGroupByPath(draftState, parentGroupPath);

      if (parentRuleGroup && targetIndex >= 0 && targetIndex < parentRuleGroup.rules.length) {
        parentRuleGroup.rules.splice(targetIndex, 1);
      }

      return draftState;
    }
    case 'ungroup-rule-group': {
      const targetPath = action.payload.path;
      const targetIndex = targetPath.slice(-1)[0] ?? -1;
      const parentGroupPath = targetPath.slice(0, -1);
      const toBeUngroupedRuleGroup = findRuleGroupByPath(draftState, targetPath);
      const parentRuleGroup = findRuleGroupByPath(draftState, parentGroupPath);

      if (
        parentRuleGroup &&
        toBeUngroupedRuleGroup &&
        targetIndex >= 0 &&
        targetIndex < parentRuleGroup.rules.length
      ) {
        parentRuleGroup.rules.splice(targetIndex, 1, ...toBeUngroupedRuleGroup.rules);
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
    case 'lock-rule': {
      const targetPath = action.payload.path;
      const targetRule = findRuleByPath(draftState, targetPath);

      if (targetRule) {
        targetRule.locked = !targetRule.locked;
      }

      return draftState;
    }
    case 'delete-rule': {
      const targetPath = action.payload.path;
      const targetIndex = targetPath.slice(-1)[0] ?? -1;
      const parentGroupPath = targetPath.slice(0, -1);
      const parentRuleGroup = findRuleGroupByPath(draftState, parentGroupPath);

      if (parentRuleGroup && targetIndex >= 0 && targetIndex < parentRuleGroup.rules.length) {
        parentRuleGroup.rules.splice(targetIndex, 1);
      }

      return draftState;
    }
    case 'negate-rule-group': {
      const targetPath = action.payload.path;
      const targetGroup = findRuleGroupByPath(draftState, targetPath);

      if (targetGroup) {
        targetGroup.not = !targetGroup.not;
      }

      return draftState;
    }
    case 'negate-rule': {
      const targetPath = action.payload.path;
      const targetRule = findRuleByPath(draftState, targetPath);

      if (targetRule) {
        targetRule.not = !targetRule.not;
      }

      return draftState;
    }
    case 'toggle-combinator': {
      const targetPath = action.payload.path;
      const targetGroup = findRuleGroupByPath(draftState, targetPath);

      if (targetGroup) {
        targetGroup.combinator = action.payload.value;
      }

      return draftState;
    }
    case 'set-field': {
      const targetPath = action.payload.path;
      const targetRule = findRuleByPath(draftState, targetPath);

      if (targetRule) {
        targetRule.field = action.payload.field !== null ? action.payload.field.name : null;
      }
      return draftState;
    }
    case 'set-operator': {
      const targetPath = action.payload.path;
      const targetRule = findRuleByPath(draftState, targetPath);

      if (targetRule) {
        targetRule.operator =
          action.payload.operator !== null ? action.payload.operator.label : null;
      }

      return draftState;
    }
    case 'set-field-value': {
      const targetPath = action.payload.path;
      const targetRule = findRuleByPath(draftState, targetPath);

      if (targetRule) {
        targetRule.fieldValue = action.payload.fieldValue;
      }

      return draftState;
    }
    case 'shift-up': {
      const currentPath = action.payload.path;
      const targetIndex = currentPath.slice(-1)[0] ?? -1;
      const parentGroupPath = currentPath.slice(0, -1);
      const parentRuleGroup = findRuleGroupByPath(draftState, parentGroupPath);

      if (parentRuleGroup && targetIndex >= 0 && targetIndex < parentRuleGroup.rules.length) {
        const currentItem = parentRuleGroup.rules[targetIndex];
        const aboveItem = parentRuleGroup.rules[targetIndex - 1];

        if (currentItem && aboveItem && 'rules' in aboveItem) {
          // Move temp inside the above rule group as the last rule or group only if it's not locked...
          if (!aboveItem.locked) {
            aboveItem.rules.push(currentItem);
            parentRuleGroup.rules.splice(targetIndex, 1);
          }
          return draftState;
        } else if (currentItem && aboveItem) {
          // Swap with the above item
          parentRuleGroup.rules[targetIndex] = parentRuleGroup.rules[targetIndex - 1]!;
          parentRuleGroup.rules[targetIndex - 1] = currentItem;
        } else if (currentItem && !aboveItem) {
          // Move temp to the grand parent group
          const grandParentGroupPath = parentGroupPath.slice(0, -1);
          const grandParentRuleGroup = findRuleGroupByPath(draftState, grandParentGroupPath);
          const grandParentIndex = parentGroupPath.slice(-1)[0] ?? -1;

          if (grandParentRuleGroup && grandParentIndex >= 0) {
            grandParentRuleGroup.rules.splice(grandParentIndex, 0, currentItem);
            parentRuleGroup.rules.splice(targetIndex, 1);
          }
        }
      }

      return draftState;
    }
    case 'shift-down': {
      const currentPath = action.payload.path;
      const targetIndex = currentPath.slice(-1)[0] ?? -1;
      const parentGroupPath = currentPath.slice(0, -1);
      const parentRuleGroup = findRuleGroupByPath(draftState, parentGroupPath);

      if (parentRuleGroup && targetIndex >= 0 && targetIndex < parentRuleGroup.rules.length) {
        const currentItem = parentRuleGroup.rules[targetIndex];
        const belowItem = parentRuleGroup.rules[targetIndex + 1];

        if (currentItem && belowItem && 'rules' in belowItem) {
          // Move temp inside the below rule group as the first rule or group only if it's not locked...
          if (!belowItem.locked) {
            belowItem.rules.unshift(currentItem);
            parentRuleGroup.rules.splice(targetIndex, 1);
          }
        } else if (currentItem && belowItem) {
          // Swap with the below item
          parentRuleGroup.rules[targetIndex] = parentRuleGroup.rules[targetIndex + 1]!;
          parentRuleGroup.rules[targetIndex + 1] = currentItem;
        } else if (currentItem && !belowItem) {
          // Move temp to the grand parent group
          const grandParentGroupPath = parentGroupPath.slice(0, -1);
          const grandParentRuleGroup = findRuleGroupByPath(draftState, grandParentGroupPath);
          const grandParentIndex = parentGroupPath.slice(-1)[0] ?? -1;

          if (grandParentRuleGroup && grandParentIndex >= 0) {
            grandParentRuleGroup.rules.splice(grandParentIndex + 1, 0, currentItem);
            parentRuleGroup.rules.splice(targetIndex, 1);
          }
        }
      }

      return draftState;
    }
    case 'move-rule': {
      const sourcePath = action.payload.sourcePath;
      const destinationPath = action.payload.destinationPath;
      const dropPosition = action.payload.dropPosition;

      const sourceIndex = sourcePath.slice(-1)[0] ?? -1;
      const destinationIndex = destinationPath.slice(-1)[0] ?? -1;
      const sourceParentPath = sourcePath.slice(0, -1);
      const destinationParentPath = destinationPath.slice(0, -1);

      const sourceParentRuleGroup = findRuleGroupByPath(draftState, sourceParentPath);
      const destinationParentRuleGroup = findRuleGroupByPath(draftState, destinationParentPath);

      if (
        sourceParentRuleGroup &&
        destinationParentRuleGroup &&
        sourceIndex >= 0 &&
        sourceIndex < sourceParentRuleGroup.rules.length
      ) {
        const currentItem = sourceParentRuleGroup.rules[sourceIndex]!;

        if (destinationIndex >= 0 && destinationIndex < destinationParentRuleGroup.rules.length) {
          if (dropPosition === 'top') {
            destinationParentRuleGroup.rules.splice(destinationIndex, 0, currentItem);
            sourceParentRuleGroup.rules.splice(sourceIndex, 1);
          } else {
            destinationParentRuleGroup.rules.splice(destinationIndex + 1, 0, currentItem);
            sourceParentRuleGroup.rules.splice(sourceIndex, 1);
          }
        } else {
          destinationParentRuleGroup.rules.push(currentItem);
          sourceParentRuleGroup.rules.splice(sourceIndex, 1);
        }
      }

      return draftState;
    }
    default: {
      return draftState;
    }
  }
};
