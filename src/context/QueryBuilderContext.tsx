import { createContext, useContext, type JSX } from 'solid-js';
import { DEFAULT_COMBINATOR } from 'src/constants';

import { useReducer } from 'src/hooks';
import { queryBuilderReducer } from 'src/reducer';

import type { Query, QueryBuilderActions, QueryBuilderConfig } from 'src/types';
import { getDefaultRuleGroup, defaultProps } from 'src/utils';

type Config = Pick<QueryBuilderConfig, 'showNotToggle' | 'disabled' | 'combinators'>;

type QueryBuilderContext = [
  store: Query,
  dispatch: (action: QueryBuilderActions) => void,
  config: Config,
];

const QueryBuilderContext = createContext<QueryBuilderContext>();

type QueryBuilderProviderProps = Pick<
  QueryBuilderConfig,
  'initialQuery' | 'onQueryChangeHandler' | 'showNotToggle' | 'disabled' | 'combinators'
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
    {
      showNotToggle: 'both',
      initialQuery: getInitialQuery(props.initialQuery),
      disabled: false,
      combinators: DEFAULT_COMBINATOR,
    },
    props,
  );

  const [store, dispatch] = useReducer<Query, QueryBuilderActions>(
    queryBuilderReducer,
    mergedProps.initialQuery,
  );

  const config: Config = {
    showNotToggle: mergedProps.showNotToggle,
    disabled: mergedProps.disabled,
    combinators: mergedProps.combinators,
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
