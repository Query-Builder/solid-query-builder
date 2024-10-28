import { createContext, useContext, type JSX } from 'solid-js';

import { useReducer } from 'src/hooks';
import { queryBuilderReducer } from 'src/reducer';

import { Query, QueryBuilderActions } from 'src/types';

const QueryBuilderContext = createContext();

type QueryBuilderProviderProps = {
  initialQuery?: Query;
  children: JSX.Element;
};

const getInitialQuery = (initialQuery?: Query): Query => {
  if (!initialQuery) {
    return {
      id: `${Date.now()}`,
      combinator: 'AND',
      rules: [],
    };
  }
  return initialQuery;
};

export const QueryBuilderProvider = (props: QueryBuilderProviderProps) => {
  const [store, dispatch] = useReducer<Query, QueryBuilderActions>(
    queryBuilderReducer,
    getInitialQuery(props.initialQuery),
  );

  return (
    <QueryBuilderContext.Provider value={{ store, dispatch }}>
      {props.children}
    </QueryBuilderContext.Provider>
  );
};

export const useQueryBuilderContext = () => {
  return useContext(QueryBuilderContext);
};
