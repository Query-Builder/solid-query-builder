import type { Not_Selection } from './base';
import type { Combinator } from './combinator';
import type { RuleGroupType } from './rule-group';
import type { Fields } from './fields';
import type { OperatorsList } from './operators';
import type { JSX } from 'solid-js/jsx-runtime';
import type { CustomValueEditorProps } from './fieldsValue';

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
  /** Required used to select fields for each rows */
  fields: Fields[];
  /** if provided all the rules will use this operator */
  operators?: OperatorsList | null;
  /** if provided will return the operators based on the datatype field from FieldsList */
  getOperators?: (field: string, misc: { fieldsData: Fields }) => OperatorsList | null;
  /** if provided will override the default components */
  controlElements?: {
    customOperators?: (field: Fields | undefined) => JSX.Element;
    customValueEditor?: (props: CustomValueEditorProps) => JSX.Element;
  };
  /** If provided, it will show the shift actions with ability to move the rules or rule groups up or down  */
  showShiftActions?: boolean;
  /** If provided, it will allow the drag and drop feature to move the rules or rule groups up or down  */
  allowDragAndDrop?: boolean;
  /** If provided, it will allow add an single rule to new group, else it will be an empty group */
  addSingleRuleToGroup?: boolean;
  /** If provided, it will show default styled branches */
  showBranches?: boolean;
};
