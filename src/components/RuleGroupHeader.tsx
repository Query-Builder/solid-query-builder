import { For, Show } from 'solid-js';
import { useQueryBuilderContext } from 'src/context';

import type { Path, RuleGroupType } from 'src/types';
import { ShiftActions } from './ShiftActions';

type RuleGroupHeaderProps = {
  path: Path;
  query: RuleGroupType;
  shiftUpDisabled: boolean;
  shiftDownDisabled: boolean;
  parentLocked: boolean;
};

export const RuleGroupHeader = (props: RuleGroupHeaderProps) => {
  const { dispatch, config } = useQueryBuilderContext();

  return (
    <div
      class={['rule-group__header', props.query.locked ? 'rule-group__header-disabled' : ''].join(
        ' ',
      )}
    >
      {config().showShiftActions && props.path.length > 0 ? (
        <ShiftActions
          path={props.path}
          shiftUpDisabled={props.parentLocked || props.query.locked || props.shiftUpDisabled}
          shiftDownDisabled={props.parentLocked || props.query.locked || props.shiftDownDisabled}
        />
      ) : null}
      <select
        name="combinator"
        class="combinator"
        value={props.query.combinator}
        disabled={config().disabled || props.parentLocked || props.query.locked}
        aria-label="Select combinator..."
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
      <Show when={config().showNotToggle === 'both' || config().showNotToggle === 'rule_group'}>
        <label>
          <input
            type="checkbox"
            name="not-rule-group"
            class="not-rule-group"
            checked={props.query.not}
            disabled={config().disabled || props.parentLocked || props.query.locked}
            onChange={() => dispatch({ type: 'negate-rule-group', payload: { path: props.path } })}
          />
          Not
        </label>
      </Show>
      <button
        class="add-rule"
        disabled={config().disabled || props.parentLocked || props.query.locked}
        onClick={() => dispatch({ type: 'add-rule', payload: { path: props.path } })}
      >
        Add Rule
      </button>
      <button
        class="add-rule-group"
        disabled={config().disabled || props.parentLocked || props.query.locked}
        onClick={() =>
          dispatch({
            type: 'add-rule-group',
            payload: { path: props.path, addSingleRuleToGroup: config().addSingleRuleToGroup },
          })
        }
      >
        Add Group
      </button>

      <Show when={props.path.length > 0}>
        <button
          class="ungroup-rule-group"
          disabled={config().disabled || props.parentLocked || props.query.locked}
          onClick={() => dispatch({ type: 'ungroup-rule-group', payload: { path: props.path } })}
        >
          Ungroup
        </button>
        <button
          class="clone-rule-group"
          disabled={config().disabled || props.parentLocked || props.query.locked}
          onClick={() => dispatch({ type: 'clone-rule-group', payload: { path: props.path } })}
        >
          Clone Group
        </button>
        <button
          class="delete-rule-group"
          disabled={config().disabled || props.parentLocked || props.query.locked}
          onClick={() => dispatch({ type: 'delete-rule-group', payload: { path: props.path } })}
        >
          Delete Group
        </button>
      </Show>
      <button
        class="lock-rule-group"
        disabled={config().disabled || props.parentLocked}
        onClick={() => dispatch({ type: 'lock-rule-group', payload: { path: props.path } })}
      >
        Lock
      </button>
    </div>
  );
};
