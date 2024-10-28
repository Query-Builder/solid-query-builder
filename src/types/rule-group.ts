import { type Combinator } from './base';
import { type Rule } from './rule';

export type RuleGroup = {
  /** UUID v4 */
  id: string;
  /** Combinator support to be AND or OR */
  combinator: Combinator;
  /** list of rules or rule group as part of this group */
  rules: Rule[] | RuleGroup[];
};
