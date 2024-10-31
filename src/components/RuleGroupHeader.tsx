import { Show } from 'solid-js';
import { useQueryBuilderContext } from 'src/context';

import type { Path, RuleGroupType } from 'src/types';

type RuleGroupHeaderProps = {
  path: Path;
  query: RuleGroupType;
};

export const RuleGroupHeader = (props: RuleGroupHeaderProps) => {
  const [, dispatch] = useQueryBuilderContext();

  return (
    <div class="rule-group__header">
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
