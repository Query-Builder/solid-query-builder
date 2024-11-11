import { QueryBuilderBase } from './components';
import { QueryBuilderProvider, QueryBuilderDNDContextProvider } from './context';

import type { QueryBuilderConfig } from './types';

import './styles.css';

// all types
export * from './types';

// Default Operators
export { defaultOperators } from './constants';

// format Query
export { formatQuery } from './formatQuery';

// Value Editor
export { ValueEditor } from './components';

type QueryBuilderProps = QueryBuilderConfig;

export const QueryBuilder = (props: QueryBuilderProps) => {
  return (
    <QueryBuilderProvider {...props}>
      <QueryBuilderDNDContextProvider>
        <QueryBuilderBase />
      </QueryBuilderDNDContextProvider>
    </QueryBuilderProvider>
  );
};
