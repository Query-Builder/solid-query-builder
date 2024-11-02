import { For, Show } from 'solid-js';

import { RuleGroup } from './RuleGroup';
import { Rule } from './Rule';

import type { Path, RuleGroupType, RuleType } from 'src/types';
import { arePathsEqual } from 'src/utils';

type RuleGroupBodyProps = {
  path: Path;
  query: RuleGroupType;
  parentLocked: boolean;
};

export const RuleGroupBody = (props: RuleGroupBodyProps) => {
  return (
    <div
      class={['rule-group__body', props.query.locked ? 'rule-group__body-disabled' : '']
        .filter(Boolean)
        .join(' ')}
    >
      <For each={props.query.rules}>
        {(rule, index) => {
          const thisPath = () => [...props.path, index()];
          const shiftUpDisabled = () => arePathsEqual([0], thisPath());
          const shiftDownDisabled = () =>
            props.path.length === 0 && index() === props.query.rules.length - 1;

          return (
            <>
              <Show
                when={'rules' in rule}
                fallback={
                  <Rule
                    rule={rule as RuleType}
                    path={thisPath()}
                    parentLocked={props.parentLocked || Boolean(props.query.locked)}
                    shiftUpDisabled={shiftUpDisabled()}
                    shiftDownDisabled={shiftDownDisabled()}
                  />
                }
              >
                <RuleGroup
                  path={thisPath()}
                  query={rule as RuleGroupType}
                  parentLocked={props.parentLocked || Boolean(props.query.locked)}
                  shiftUpDisabled={shiftUpDisabled()}
                  shiftDownDisabled={shiftDownDisabled()}
                />
              </Show>
            </>
          );
        }}
      </For>
    </div>
  );
};
