import { type MergeProps, mergeProps } from 'solid-js';
import { v4 as uuidv4 } from 'uuid';

import type { Path, RuleGroupType, RuleType } from 'src/types';

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

export const getDefaultRuleGroup = (addSingleRuleToGroup: boolean): RuleGroupType => ({
  id: uuidv4(),
  combinator: 'AND',
  locked: false,
  not: false,
  rules: [...(addSingleRuleToGroup ? [getDefaultRule()] : [])],
});

export const getDefaultRule = (): RuleType => ({
  id: uuidv4(),
  // TODO: default should be null.. or auto select...
  field: 'field-A',
  operator: 'operator-A',
  fieldValue: 'field-value-A',
  locked: false,
  not: false,
});

export const defaultProps = <T, K extends keyof T>(
  defaults: Required<Pick<T, K>>,
  props: T,
): MergeProps<[Required<Pick<T, K>>, T]> => {
  const resolvedProps = mergeProps(defaults, props);
  return resolvedProps;
};

export const arePathsEqual = (path1: Path, path2: Path): boolean => {
  return path1.length === path2.length && path1.every((value, index) => value === path2[index]);
};
