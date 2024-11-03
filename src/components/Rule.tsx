import { Show, For, createEffect, createSignal } from 'solid-js';
import { useQueryBuilderContext } from 'src/context';

import { defaultOperators } from 'src/constants';

import type { Fields, FieldsValue, Path, RuleType, OperatorsList } from 'src/types';
import { ValueEditor } from './ValueEditor';

type RuleProps = {
  path: Path;
  rule: RuleType;
  parentLocked: boolean;
};

const getFieldFromName = (field: string, fields: Fields[]) => fields.find(f => f.name === field);

const getOperatorsFromField = (
  field: string,
  operators: OperatorsList | null | undefined,
  fieldList: Fields[],
) => {
  const fieldOperators = getFieldFromName(field, fieldList)?.operators;
  if (fieldOperators) {
    return fieldOperators;
  } else if (operators && operators.length > 0) {
    return operators;
  } else {
    return defaultOperators;
  }
};

export const Rule = (props: RuleProps) => {
  const { dispatch, config } = useQueryBuilderContext();

  const [ruleOperators, setRuleOperators] = createSignal<OperatorsList | null>(null);

  createEffect(() => {
    if (props.rule.field) {
      setRuleOperators(
        getOperatorsFromField(props.rule.field, config().operators, config().fields),
      );
    }
  });

  return (
    <div
      data-testid="rule"
      class={['rule', props.rule.locked ? 'rule-disabled' : ''].join(' ')}
      data-level={props.path.length}
      data-path={JSON.stringify(props.path)}
      data-rule-id={props.rule.id}
      aria-disabled={config().disabled || props.parentLocked || props.rule.locked}
      data-disabled={config().disabled || props.parentLocked || props.rule.locked}
    >
      {/*Rule Fields*/}
      <select
        name="fields"
        id="fields"
        onChange={e => {
          const field = config().fields.find(f => f.name === e.target.value);
          if (field) {
            dispatch({ type: 'set-field', payload: { path: props.path, field } });
          }
        }}
      >
        <Show when={props.rule.field === null}>
          <option>----</option>
        </Show>
        <For each={config().fields}>
          {field => {
            return <option>{field.name}</option>;
          }}
        </For>
      </select>

      {/*Rule Operator*/}
      <Show
        when={config().controlElements?.customOperators?.() === null}
        fallback={config().controlElements?.customOperators?.()}
      >
        <Show when={props.rule.field !== null}>
          <select
            name="operators"
            id="operators"
            onChange={e => {
              if (ruleOperators()) {
                const operator = ruleOperators()?.find(f => f.value === e.target.value);
                if (operator) {
                  dispatch({ type: 'set-operator', payload: { path: props.path, operator } });
                }
              }
            }}
          >
            <Show when={props.rule.operator === null}>
              <option>----</option>
            </Show>
            <For each={ruleOperators()}>
              {field => {
                return <option>{field.value}</option>;
              }}
            </For>
          </select>
        </Show>
      </Show>

      {/*Rule fieldValue*/}
      <Show
        when={config().controlElements?.customValueEditor?.() === null}
        fallback={config().controlElements?.customValueEditor?.()}
      >
        <Show when={props.rule.field !== null && props.rule.operator !== null}>
          <ValueEditor
            disabled={config().disabled || false}
            fieldData={
              props.rule.field !== null
                ? getFieldFromName(props.rule.field, config().fields)
                : undefined
            }
            handleOnChange={(value: FieldsValue) => {
              dispatch({
                type: 'set-fieldValue',
                payload: { path: props.path, fieldValue: value },
              });
            }}
            inputType={
              props.rule.field
                ? getFieldFromName(props.rule.field, config().fields)?.inputType
                : 'text'
            }
            listsAsArrays={config().fields.find(f => f.name === props.rule.field)?.listAsArrays}
            operator={props.rule.operator !== null ? props.rule.operator : ''}
            separator={
              props.rule.field
                ? getFieldFromName(props.rule.field, config().fields)?.separator
                : ','
            }
            title={config().fields.find(f => f.name === props.rule.field)?.title}
            valueEditorType={
              props.rule.field !== null
                ? getFieldFromName(props.rule.field, config().fields)?.valueEditorType
                : 'text'
            }
            values={config().fields.find(f => f.name === props.rule.field)?.values ?? []}
            value={props.rule.fieldValue}
            selectorComponent={null}
          />
        </Show>
      </Show>

      {/*Rule Actions*/}
      <Show when={config().showNotToggle === 'both' || config().showNotToggle === 'rule'}>
        <label>
          <input
            type="checkbox"
            name="not-rule-group"
            checked={props.rule.not}
            disabled={config().disabled || props.parentLocked || props.rule.locked}
            onChange={() => dispatch({ type: 'negate-rule', payload: { path: props.path } })}
          />
          Not
        </label>
      </Show>
      <button
        data-testid="lock-rule-button"
        class="lock-button"
        disabled={config().disabled || props.parentLocked}
        onClick={() => dispatch({ type: 'lock-rule', payload: { path: props.path } })}
      >
        Lock
      </button>
      <button
        data-testid="delete-rule-button"
        class="delete-button"
        disabled={config().disabled || props.parentLocked || props.rule.locked}
        onClick={() => dispatch({ type: 'delete-rule', payload: { path: props.path } })}
      >
        Delete
      </button>
    </div>
  );
};
