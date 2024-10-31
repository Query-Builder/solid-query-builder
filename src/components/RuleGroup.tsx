import { RuleGroupBody } from './RuleGroupBody';
import { RuleGroupHeader } from './RuleGroupHeader';

import type { Path, RuleGroupType } from 'src/types';

type RuleGroupProps = {
  path: Path;
  query: RuleGroupType;
  parentLocked: boolean;
};

export const RuleGroup = (props: RuleGroupProps) => {
  return (
    <div
      title={props.path.length > 0 ? `Rule group at path ${props.path}` : 'Query Builder'}
      class={['rule-group', props.query.locked ? 'rule-group-disabled' : ''].join(' ')}
      data-testid="rule-group"
      data-rule-group-id={props.query.id}
      data-level={props.path.length}
      data-path={JSON.stringify(props.path)}
      aria-disabled={props.query.locked}
      data-locked={props.query.locked}
    >
      <RuleGroupHeader path={props.path} query={props.query} />
      <RuleGroupBody path={props.path} query={props.query} parentLocked={Boolean(props.query.locked)} />
    </div>
  );
};
