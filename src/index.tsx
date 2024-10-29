import { QueryBuilderBase } from './components';
import { QueryBuilderProvider } from './context/QueryBuilderContext';
import { Query } from './types';

import './styles.css';

// all types
export * from './types';

type QueryBuilderProps = {
  /**
   * If provided, the component will behave in uncontrolled manner, this would be used to define the initial state..
   * If not provided, an empty group will be added, & it would still be in uncontrolled state...
   */
  intialQuery?: Query;
  /** Handler which notifies the new query as it's created */
  onQueryChangeHandler?: (newQuery: Query) => void;
};

export const QueryBuilder = (props: QueryBuilderProps) => {
  return (
    <QueryBuilderProvider initialQuery={props.intialQuery}>
      <QueryBuilderBase />
    </QueryBuilderProvider>
  );
};
