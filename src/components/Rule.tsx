import { Show, For, createEffect, createSignal } from 'solid-js';

import { ValueEditor } from './ValueEditor';
import ValueSelector from './ValueSelector';

import { useQueryBuilderContext } from 'src/context';

import { defaultOperators } from 'src/constants';

import type {
  CustomValueEditorProps,
  Fields,
  FieldsValue,
  Path,
  RuleType,
  OperatorsList,
} from 'src/types';

type RuleProps = {
  path: Path;
  rule: RuleType;
  parentLocked: boolean;
};

const getFieldFromName = (field: string | null, fields: Fields[]) =>
  field ? fields.find(f => f.name === field) : undefined;

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

  const currentFieldData = () => getFieldFromName(props.rule.field, config().fields);

  const customValueEditorProp = () =>
    ({
      fieldData: currentFieldData(),
      operator: props.rule.operator,
      value: props.rule.fieldValue,
      handleOnChange: (value: FieldsValue) => {
        dispatch({
          type: 'set-field-value',
          payload: { path: props.path, fieldValue: value },
        });
      },
    }) as CustomValueEditorProps;

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
      <Show when={props.rule.field !== null}>
        <Show
          when={config().controlElements?.customOperators?.(currentFieldData()) === null}
          fallback={config().controlElements?.customOperators?.(currentFieldData())}
        >
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
      <Show when={props.rule.field !== null && props.rule.operator !== null}>
        <Show
          when={config().controlElements?.customValueEditor?.(customValueEditorProp()) === null}
          fallback={config().controlElements?.customValueEditor?.(customValueEditorProp())}
        >
          <ValueEditor
            disabled={config().disabled}
            fieldData={currentFieldData()}
            inputType={currentFieldData()?.inputType}
            listsAsArrays={currentFieldData()?.listAsArrays}
            operator={props.rule.operator ?? ''}
            separator={currentFieldData()?.separator}
            title={currentFieldData()?.title}
            valueEditorType={currentFieldData()?.valueEditorType}
            values={currentFieldData()?.values ?? []}
            value={props.rule.fieldValue}
            selectorComponent={ValueSelector}
            handleOnChange={(value: FieldsValue) => {
              dispatch({
                type: 'set-field-value',
                payload: { path: props.path, fieldValue: value },
              });
            }}
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
