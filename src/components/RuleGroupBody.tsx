import { For, Show } from 'solid-js';

import { RuleGroup } from './RuleGroup';
import { Rule } from './Rule';

import type { Path, RuleGroupType, RuleType } from 'src/types';

type RuleGroupBodyProps = {
  path: Path;
  query: RuleGroupType;
};

export const RuleGroupBody = (props: RuleGroupBodyProps) => {
  return (
    <div class="rule-group__body">
      <For each={props.query.rules}>
        {(rule, index) => {
          const thisPath = () => [...props.path, index()];
          return (
            <>
              <Show
                when={'rules' in rule}
                fallback={<Rule rule={rule as RuleType} path={thisPath()} />}
                keyed
              >
                <RuleGroup path={thisPath()} query={rule as RuleGroupType} />
              </Show>
            </>
          );
        }}
      </For>
    </div>
  );
};
