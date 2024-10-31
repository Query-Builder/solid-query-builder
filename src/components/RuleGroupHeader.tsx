import { Show } from 'solid-js';
import { useQueryBuilderContext } from 'src/context';

import type { Path, RuleGroupType } from 'src/types';

type RuleGroupHeaderProps = {
  path: Path;
  query: RuleGroupType;
};

export const RuleGroupHeader = (props: RuleGroupHeaderProps) => {
  const [, dispatch, config] = useQueryBuilderContext();

  return (
    <div
      class={['rule-group__header', props.query.locked ? 'rule-group__header-disabled' : ''].join(
        '',
      )}
    >
      <button
        disabled={props.query.locked}
        onClick={() => dispatch({ type: 'add-rule', payload: { path: props.path } })}
      >
        Add Rule
      </button>
      <button
        disabled={props.query.locked}
        onClick={() => dispatch({ type: 'add-rule-group', payload: { path: props.path } })}
      >
        Add Group
      </button>
      <Show when={config.showNotToggle === 'both' || config.showNotToggle === 'rule_group'}>
        <label>
          <input
            type="checkbox"
            name="not-rule-group"
            checked={props.query.not}
            onChange={() => dispatch({ type: 'negate-rule-group', payload: { path: props.path } })}
          />
          Not
        </label>
      </Show>
      <Show when={props.path.length > 0}>
        <button
          disabled={props.query.locked}
          onClick={() => dispatch({ type: 'ungroup-rule-group', payload: { path: props.path } })}
        >
          Ungroup
        </button>
        <button
          disabled={props.query.locked}
          onClick={() => dispatch({ type: 'clone-rule-group', payload: { path: props.path } })}
        >
          Clone Group
        </button>
        <button
          disabled={props.query.locked}
          onClick={() => dispatch({ type: 'delete-rule-group', payload: { path: props.path } })}
        >
          Delete Group
        </button>
      </Show>
      <button onClick={() => dispatch({ type: 'lock-rule-group', payload: { path: props.path } })}>
        Lock
      </button>
      <span>
        Group - {props.path} ==== {props.query.id}
      </span>
    </div>
  );
};
