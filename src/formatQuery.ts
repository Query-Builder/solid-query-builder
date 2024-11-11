import type { RuleGroupType, RuleType } from 'src/types';

let parsedQuery = '';
export const formatQuery = (query: RuleGroupType, format?: string) => {
  switch (format) {
    case 'json':
    // return JSON.stringify(query, null, 2);
    case 'sql':
    // return parser(query);
    default:
      const { combinator, rules } = query;
      parsedQuery += `${combinator} (`;
      rules.map((rule, index) => {
        if ('combinator' in rule && rule.combinator) {
          return formatQuery(rule);
        }
        const { field, operator, fieldValue } = rule as RuleType;
        parsedQuery += `${field} ${operator} ${fieldValue}`;
        if (index < rules.length - 1) {
          parsedQuery += ', ';
        }
      });
      parsedQuery += '), ';
      return `${parsedQuery.slice(0, -2)}`;
  }
};
