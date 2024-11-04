import type { Not_Selection } from './base';
import { type Combinator } from './combinator';
import type { RuleGroupType } from './rule-group';

export type Query = RuleGroupType;

export type QueryState = {
  query: Query;
};

export type QueryBuilderConfig = {
  /**
   * If provided, the component will behave in uncontrolled manner, this would be used to define the initial state..
   * If not provided, an empty group will be added, & it would still be in uncontrolled state...
   */
  initialQuery?: Query;
  /** Handler which notifies the new query as it's created */
  onQueryChangeHandler?: (newQuery: Query) => void;
  /** If provided, it will show or hide the not button for the specified level */
  showNotToggle?: Not_Selection;
  /** If provided, it will disabled the query and disallow user from performing any actions */
  disabled?: boolean;
  /** If not provided, it would use default combinator of AND and OR */
  combinators?: Combinator[];
  /** If provided, it will show the shift actions with ability to move the rules or rule groups up or down  */
  showShiftActions?: boolean;
  /** If provided, it will allow the drag and drop feature to move the rules or rule groups up or down  */
  allowDragAndDrop?: boolean;
  /** If provided, it will allow add an single rule to new group, else it will be an empty group */
  addSingleRuleToGroup?: boolean;
};
