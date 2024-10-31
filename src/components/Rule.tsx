import { Show } from 'solid-js';
import { useQueryBuilderContext } from 'src/context';

import type { Path, RuleType } from 'src/types';

type RuleProps = {
  path: Path;
  rule: RuleType;
  parentLocked: boolean;
};

export const Rule = (props: RuleProps) => {
  const [, dispatch, config] = useQueryBuilderContext();

  return (
    <div
      data-testid="rule"
      class={['rule', props.rule.locked ? 'rule-disabled' : ''].join(' ')}
      data-level={props.path.length}
      data-path={JSON.stringify(props.path)}
      data-rule-id={props.rule.id}
      aria-disabled={props.parentLocked || props.rule.locked}
      data-disabled={props.parentLocked || props.rule.locked}
    >
      Rule: {props.path} ==== {JSON.stringify(props.rule)}
      <Show when={config.showNotToggle === 'both' || config.showNotToggle === 'rule'}>
        <label>
          <input
            type="checkbox"
            name="not-rule-group"
            checked={props.rule.not}
            onChange={() => dispatch({ type: 'negate-rule', payload: { path: props.path } })}
          />
          Not
        </label>
      </Show>
      <button
        data-testid="lock-rule-button"
        class="lock-button"
        disabled={props.parentLocked}
        onClick={() => dispatch({ type: 'lock-rule', payload: { path: props.path } })}
      >
        Lock
      </button>
      <button
        data-testid="delete-rule-button"
        class="delete-button"
        disabled={props.parentLocked || props.rule.locked}
        onClick={() => dispatch({ type: 'delete-rule', payload: { path: props.path } })}
      >Delete</button>
    </div>
  );
};
