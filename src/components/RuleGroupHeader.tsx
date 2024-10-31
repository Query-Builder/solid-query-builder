import { Show } from 'solid-js';
import { useQueryBuilderContext } from 'src/context';

import type { Path } from 'src/types';

type RuleGroupHeaderProps = {
  path: Path;
  id: string;
};

export const RuleGroupHeader = (props: RuleGroupHeaderProps) => {
  const [, dispatch] = useQueryBuilderContext();

  return (
    <div class="rule-group__header">
      <button onClick={() => dispatch({ type: 'add-rule', payload: { path: props.path } })}>
        Add Rule
      </button>
      <button onClick={() => dispatch({ type: 'add-rule-group', payload: { path: props.path } })}>
        Add Group
      </button>
      <Show when={props.path.length > 0}>
        <button
          onClick={() => dispatch({ type: 'ungroup-rule-group', payload: { path: props.path } })}
        >
          Ungroup
        </button>
        <button
          onClick={() => dispatch({ type: 'clone-rule-group', payload: { path: props.path } })}
        >
          Clone Group
        </button>
        <button
          onClick={() => dispatch({ type: 'delete-rule-group', payload: { path: props.path } })}
        >
          Delete Group
        </button>
      </Show>
      <span>Group - {props.path} ==== {props.id}</span>
    </div>
  );
};
