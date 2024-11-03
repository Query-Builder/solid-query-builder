import { createContext, createSignal, useContext, type Setter } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';

import type { Position } from 'src/types';

type Config = {
  dropPosition: Position | null;
};

type QueryBuilderDNDContext = {
  dndConfig: () => Config;
  setDropPosition: Setter<Position | null>;
};

type QueryBuilderDNDContextProps = {
  children: JSX.Element;
};

const QueryBuilderDNDContext = createContext<QueryBuilderDNDContext>();

export const QueryBuilderDNDContextProvider = (props: QueryBuilderDNDContextProps) => {
  const [dropPosition, setDropPosition] = createSignal<Position>(null);

  const dndConfig = () => ({
    dropPosition: dropPosition(),
  });

  return (
    <QueryBuilderDNDContext.Provider value={{ dndConfig, setDropPosition }}>
      {props.children}
    </QueryBuilderDNDContext.Provider>
  );
};

export const useQueryBuilderDNDContext = () => {
  const context = useContext(QueryBuilderDNDContext);

  if (!context) {
    throw new Error(
      'useQueryBuilderDNDContext must be used within a QueryBuilderDNDContextProvider',
    );
  }

  return context;
};
