import type { Combinator } from 'src/types';

const AND: Combinator = { name: 'and', label: 'AND', value: 'and' } as const;
const OR: Combinator = { name: 'or', label: 'OR', value: 'or' } as const;

export const DEFAULT_COMBINATOR = [AND, OR];
