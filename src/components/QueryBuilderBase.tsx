import { useQueryBuilderContext } from 'src/context/QueryBuilderContext';

import { RuleGroup } from './RuleGroup';

export const QueryBuilderBase = () => {
  const [query] = useQueryBuilderContext();
  return (
    <div class="query-builder">
      <RuleGroup
        path={[]}
        query={query}
        parentLocked={Boolean(query.locked)}
        shiftUpDisabled={true}
        shiftDownDisabled={true}
      />
    </div>
  );
};
