import { createContext, useContext, type JSX } from 'solid-js';
import { v4 as uuidv4 } from 'uuid';

import { useReducer } from 'src/hooks';
import { queryBuilderReducer } from 'src/reducer';

import { Query, QueryBuilderActions } from 'src/types';

type QueryBuilderContext = [store: Query, dispatch: (action: QueryBuilderActions) => void];

const QueryBuilderContext = createContext<QueryBuilderContext>();

type QueryBuilderProviderProps = {
  initialQuery?: Query;
  children: JSX.Element;
};

const getInitialQuery = (initialQuery?: Query): Query => {
  if (!initialQuery) {
    return {
      id: uuidv4(),
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
    <QueryBuilderContext.Provider value={[store, dispatch]}>
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
