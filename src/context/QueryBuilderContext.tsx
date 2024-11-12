import { createContext, createEffect, createSignal, useContext, type JSX } from 'solid-js';
import { unwrap } from 'solid-js/store';

import { useReducer } from 'src/hooks';

import { queryBuilderReducer } from 'src/reducer';

import { DEFAULT_COMBINATOR } from 'src/constants';

import { getDefaultRuleGroup, defaultProps } from 'src/utils';

import type { Query, QueryBuilderActions, QueryBuilderConfig } from 'src/types';

type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

type Config = WithRequired<
  QueryBuilderConfig,
  | 'showNotToggle'
  | 'disabled'
  | 'combinators'
  | 'fields'
  | 'operators'
  | 'getOperators'
  | 'controlElements'
  | 'showShiftActions'
  | 'allowDragAndDrop'
  | 'addSingleRuleToGroup'
  | 'showBranches'
>;

type QueryBuilderContext = {
  store: Query;
  dispatch: (action: QueryBuilderActions) => void;
  config: () => Config;
};

const QueryBuilderContext = createContext<QueryBuilderContext>();

type QueryBuilderProviderProps = Pick<
  QueryBuilderConfig,
  | 'initialQuery'
  | 'onQueryChangeHandler'
  | 'showNotToggle'
  | 'disabled'
  | 'combinators'
  | 'fields'
  | 'operators'
  | 'getOperators'
  | 'controlElements'
  | 'showShiftActions'
  | 'allowDragAndDrop'
  | 'addSingleRuleToGroup'
  | 'showBranches'
> & {
  children: JSX.Element;
};

const getInitialQuery = (initialQuery?: Query, addSingleRuleToGroup?: boolean): Query => {
  if (!initialQuery) {
    return getDefaultRuleGroup(Boolean(addSingleRuleToGroup));
  }
  return initialQuery;
};

export const QueryBuilderProvider = (props: QueryBuilderProviderProps) => {
  const mergedProps = defaultProps(
    {
      showNotToggle: 'both',
      initialQuery: getInitialQuery(props.initialQuery, props.addSingleRuleToGroup),
      disabled: false,
      combinators: DEFAULT_COMBINATOR,
      operators: null,
      getOperators: () => null,
      controlElements: {
        customOperators: () => null,
        customValueEditor: () => null,
      },
      showShiftActions: false,
      allowDragAndDrop: false,
      addSingleRuleToGroup: false,
      showBranches: false,
    },
    props,
  );

  // workaround to trigger update related to store...
  const [triggerUpdate, setTriggerUpdating] = createSignal(1);
  const [store, dispatch] = useReducer<Query, QueryBuilderActions>(
    queryBuilderReducer,
    mergedProps.initialQuery,
    () => {
      setTriggerUpdating(prev => prev + 1);
    },
  );

  createEffect(() => {
    // workaround to listen to triggerred update
    triggerUpdate();
    props.onQueryChangeHandler?.(unwrap(store));
  });

  const getConfig = () => {
    return {
      showNotToggle: mergedProps.showNotToggle,
      disabled: mergedProps.disabled,
      combinators: mergedProps.combinators,
      fields: props.fields,
      operators: mergedProps.operators,
      getOperators: mergedProps.getOperators,
      controlElements: mergedProps.controlElements,
      showShiftActions: mergedProps.showShiftActions,
      allowDragAndDrop: mergedProps.allowDragAndDrop,
      addSingleRuleToGroup: mergedProps.addSingleRuleToGroup,
      showBranches: mergedProps.showBranches,
    };
  };

  return (
    <QueryBuilderContext.Provider value={{ store, dispatch, config: getConfig }}>
      {props.children}
    </QueryBuilderContext.Provider>
  );
};

export const useQueryBuilderContext = () => {
  const context = useContext(QueryBuilderContext);
  if (!context) {
    throw new Error('useQueryBuilderContext must be used within QueryBuilderContext');
  }
  return context;
};
