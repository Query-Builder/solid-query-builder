import { For, Show } from 'solid-js';
import { useQueryBuilderContext } from 'src/context';

import type { Path, RuleGroupType } from 'src/types';

type RuleGroupHeaderProps = {
  path: Path;
  query: RuleGroupType;
};

export const RuleGroupHeader = (props: RuleGroupHeaderProps) => {
  const { dispatch, config } = useQueryBuilderContext();

  return (
    <div
      class={['rule-group__header', props.query.locked ? 'rule-group__header-disabled' : ''].join(
        '',
      )}
    >
      <select
        disabled={config().disabled || props.query.locked}
        onChange={e =>
          dispatch({
            type: 'toggle-combinator',
            payload: { path: props.path, value: e.currentTarget.value },
          })
        }
      >
        <For each={config().combinators}>
          {combinator => {
            return (
              <option selected={combinator.value === props.query.combinator}>
                {combinator.label}
              </option>
            );
          }}
        </For>
      </select>
      <button
        disabled={config().disabled || props.query.locked}
        onClick={() => dispatch({ type: 'add-rule', payload: { path: props.path } })}
      >
        Add Rule
      </button>
      <button
        disabled={config().disabled || props.query.locked}
        onClick={() => dispatch({ type: 'add-rule-group', payload: { path: props.path } })}
      >
        Add Group
      </button>
      <Show when={config().showNotToggle === 'both' || config().showNotToggle === 'rule_group'}>
        <label>
          <input
            type="checkbox"
            name="not-rule-group"
            checked={props.query.not}
            disabled={config().disabled || props.query.locked}
            onChange={() => dispatch({ type: 'negate-rule-group', payload: { path: props.path } })}
          />
          Not
        </label>
      </Show>
      <Show when={props.path.length > 0}>
        <button
          disabled={config().disabled || props.query.locked}
          onClick={() => dispatch({ type: 'ungroup-rule-group', payload: { path: props.path } })}
        >
          Ungroup
        </button>
        <button
          disabled={config().disabled || props.query.locked}
          onClick={() => dispatch({ type: 'clone-rule-group', payload: { path: props.path } })}
        >
          Clone Group
        </button>
        <button
          disabled={config().disabled || props.query.locked}
          onClick={() => dispatch({ type: 'delete-rule-group', payload: { path: props.path } })}
        >
          Delete Group
        </button>
      </Show>
      <button
        disabled={config().disabled}
        onClick={() => dispatch({ type: 'lock-rule-group', payload: { path: props.path } })}
      >
        Lock
      </button>
      <span>
        Group - {props.path} ==== {props.query.id}
      </span>
    </div>
  );
};
