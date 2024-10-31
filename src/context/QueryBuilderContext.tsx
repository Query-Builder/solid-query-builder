import { createContext, useContext, type JSX } from 'solid-js';

import { useReducer } from 'src/hooks';
import { queryBuilderReducer } from 'src/reducer';

import type { Not_Selection, Query, QueryBuilderActions, QueryBuilderConfig } from 'src/types';
import { getDefaultRuleGroup, defaultProps } from 'src/utils';

// TODO: pick this from props??
type Config = {
  showNotToggle: Not_Selection;
};

type QueryBuilderContext = [
  store: Query,
  dispatch: (action: QueryBuilderActions) => void,
  config: Config,
];

const QueryBuilderContext = createContext<QueryBuilderContext>();

type QueryBuilderProviderProps = Pick<
  QueryBuilderConfig,
  'initialQuery' | 'onQueryChangeHandler' | 'showNotToggle'
> & {
  children: JSX.Element;
};

const getInitialQuery = (initialQuery?: Query): Query => {
  if (!initialQuery) {
    return getDefaultRuleGroup();
  }
  return initialQuery;
};

export const QueryBuilderProvider = (props: QueryBuilderProviderProps) => {
  const mergedProps = defaultProps(
    { showNotToggle: 'both', initialQuery: getInitialQuery(props.initialQuery) },
    props,
  );

  const [store, dispatch] = useReducer<Query, QueryBuilderActions>(
    queryBuilderReducer,
    mergedProps.initialQuery,
  );

  const config = {
    showNotToggle: mergedProps.showNotToggle,
  };

  return (
    <QueryBuilderContext.Provider value={[store, dispatch, config]}>
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
