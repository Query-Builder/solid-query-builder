import { type Combinator } from './base';
import { type RuleType } from './rule';

export type RulesType = (RuleType | RuleGroupType)[];

export type RuleGroupType = {
  /** UUID v4 */
  id: string;
  /** Combinator support to be AND or OR */
  combinator: Combinator;
  /** list of rules or rule group as part of this group */
  rules: RulesType;
};
