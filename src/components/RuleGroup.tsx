import { useQueryBuilderContext } from 'src/context';
import { RuleGroupBody } from './RuleGroupBody';
import { RuleGroupHeader } from './RuleGroupHeader';

import type { Path, RuleGroupType } from 'src/types';

type RuleGroupProps = {
  path: Path;
  query: RuleGroupType;
  parentLocked: boolean;
  shiftUpDisabled: boolean;
  shiftDownDisabled: boolean;
};

export const RuleGroup = (props: RuleGroupProps) => {
  const [, , config] = useQueryBuilderContext();

  return (
    <div
      title={props.path.length > 0 ? `Rule group at path ${props.path}` : 'Query Builder'}
      class={['rule-group', props.query.locked ? 'rule-group-disabled' : ''].join(' ')}
      data-testid="rule-group"
      data-rule-group-id={props.query.id}
      data-level={props.path.length}
      data-path={JSON.stringify(props.path)}
      aria-disabled={config.disabled || props.query.locked}
      data-locked={props.query.locked}
    >
      <RuleGroupHeader
        path={props.path}
        query={props.query}
        shiftUpDisabled={props.shiftUpDisabled}
        shiftDownDisabled={props.shiftDownDisabled}
      />
      <RuleGroupBody
        path={props.path}
        query={props.query}
        parentLocked={Boolean(props.query.locked)}
      />
    </div>
  );
};
