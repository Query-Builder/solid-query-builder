import { useQueryBuilderContext } from 'src/context/QueryBuilderContext';

import { RuleGroup } from './RuleGroup';

export const QueryBuilderBase = () => {
  const { store: query }  = useQueryBuilderContext();
  return (
    <div class="query-builder">
      <RuleGroup path={[]} query={query} parentLocked={query.locked} />
    </div>
  );
};
