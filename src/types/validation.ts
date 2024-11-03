import type { RuleType } from './rule';
/**
 * Object with a `valid` boolean value and optional `reasons`.
 */
export interface ValidationResult {
  valid: boolean;
  reasons?: any[];
}

export type RuleValidator = (rule: RuleType) => boolean | ValidationResult;
