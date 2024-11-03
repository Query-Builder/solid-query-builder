import { createContext, createSignal, useContext, type Setter } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';

import type { Position } from 'src/types';

type Config = {
  dropPosition: Position | null;
  ruleIdToPathMapping: Record<string, string>;
};

type QueryBuilderDNDContext = {
  dndConfig: () => Config;
  setDropPosition: Setter<Position | null>;
  setRuleIdToPathMapping: Setter<Record<string, string>>;
};

type QueryBuilderDNDContextProps = {
  children: JSX.Element;
};

const QueryBuilderDNDContext = createContext<QueryBuilderDNDContext>();

export const QueryBuilderDNDContextProvider = (props: QueryBuilderDNDContextProps) => {
  const [dropPosition, setDropPosition] = createSignal<Position>(null);
  // TODO: this is temporary to maintaing mapping of id's and it's corresponding path for fast lookup
  // as solid-dnd doesn't update the data...
  const [ruleIdToPathMapping, setRuleIdToPathMapping] = createSignal<Record<string, string>>({});

  const dndConfig = () => ({
    dropPosition: dropPosition(),
    ruleIdToPathMapping: ruleIdToPathMapping(),
  });

  return (
    <QueryBuilderDNDContext.Provider value={{ dndConfig, setDropPosition, setRuleIdToPathMapping }}>
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
