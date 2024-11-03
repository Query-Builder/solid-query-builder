import { type RuleType } from './rule';

export type RulesType = (RuleType | RuleGroupType)[];

export type RuleGroupType = {
  /** UUID v4 */
  id: string;
  /** Combinator support to be AND or OR */
  combinator: string;
  /** Lock the group to prevent any changes to the group */
  locked?: boolean;
  /** Negate the group to return the opposite result */
  not?: boolean;
  /** list of rules or rule group as part of this group */
  rules: RulesType;
};
