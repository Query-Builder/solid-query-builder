import { useQueryBuilderContext } from "src/context";

import type { Path } from "src/types";

type RuleGroupHeaderProps = {
  path: Path;
};

export const RuleGroupHeader = (props: RuleGroupHeaderProps) => {
  const [, dispatch] = useQueryBuilderContext();

  return (
    <div class="rule-group__header">
      <button onClick={() => dispatch({ type: 'add-rule', payload: { path: props.path } })}>+Rule</button>
      <button onClick={() => dispatch({ type: 'add-rule-group', payload: { path: props.path } })}>+Group</button>
    </div>
  );
};
