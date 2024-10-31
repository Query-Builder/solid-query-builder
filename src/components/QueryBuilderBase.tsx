import { useQueryBuilderContext } from 'src/context/QueryBuilderContext';

import { RuleGroup } from './RuleGroup';

export const QueryBuilderBase = () => {
  const [store] = useQueryBuilderContext();
  return (
    <div class="query-builder">
      <RuleGroup path={[]} query={store}/>
    </div>
  );
};
