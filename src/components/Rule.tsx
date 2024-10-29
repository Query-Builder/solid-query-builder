import type { Path, RuleType } from 'src/types';

type RuleProps = {
  path: Path;
  rule: RuleType;
};

export const Rule = (props: RuleProps) => {
  return (
    <div
      data-testid="rule"
      class="rule"
      data-level={props.path.length}
      data-path={JSON.stringify(props.path)}
      data-rule-id={props.rule.id}
    >
      Rule: {JSON.stringify(props.rule)}
    </div>
  );
};
