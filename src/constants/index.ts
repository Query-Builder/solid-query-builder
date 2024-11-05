import type { Combinator } from 'src/types';

import type { OperatorsList } from '../types';

export const defaultOperators: OperatorsList = [
  { name: '=', value: '=', label: '=' },
  { name: '!=', value: '!=', label: '!=' },
  { name: '<', value: '<', label: '<' },
  { name: '>', value: '>', label: '>' },
  { name: '<=', value: '<=', label: '<=' },
  { name: '>=', value: '>=', label: '>=' },
  { name: 'contains', value: 'contains', label: 'contains' },
  { name: 'beginsWith', value: 'beginsWith', label: 'begins with' },
  { name: 'endsWith', value: 'endsWith', label: 'ends with' },
  { name: 'doesNotContain', value: 'doesNotContain', label: 'does not contain' },
  { name: 'doesNotBeginWith', value: 'doesNotBeginWith', label: 'does not begin with' },
  { name: 'doesNotEndWith', value: 'doesNotEndWith', label: 'does not end with' },
  { name: 'null', value: 'null', label: 'is null' },
  { name: 'notNull', value: 'notNull', label: 'is not null' },
  { name: 'in', value: 'in', label: 'in' },
  { name: 'notIn', value: 'notIn', label: 'not in' },
  { name: 'between', value: 'between', label: 'between' },
  { name: 'notBetween', value: 'notBetween', label: 'not between' },
];

const AND: Combinator = { name: 'and', label: 'AND', value: 'and' } as const;
const OR: Combinator = { name: 'or', label: 'OR', value: 'or' } as const;

export const DEFAULT_COMBINATOR = [AND, OR];

/**
 * Default character used to `.join` and `.split` arrays.
 */
export const defaultJoinChar = ',';
