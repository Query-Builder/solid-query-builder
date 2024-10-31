import { RuleGroupBody } from './RuleGroupBody';
import { RuleGroupHeader } from './RuleGroupHeader';

import type { Path, RuleGroupType } from 'src/types';

type RuleGroupProps = {
  path: Path;
  query: RuleGroupType;
};

export const RuleGroup = (props: RuleGroupProps) => {
  return (
    <div
      title={props.path.length > 0 ? `Rule group at path ${props.path}` : 'Query Builder'}
      class="rule-group"
      data-testid="rule-group"
      data-rule-group-id={props.query.id}
      data-level={props.path.length}
      data-path={JSON.stringify(props.path)}
    >
      <RuleGroupHeader path={props.path} id={props.query.id} />
      <RuleGroupBody path={props.path} query={props.query} />
    </div>
  );
};
