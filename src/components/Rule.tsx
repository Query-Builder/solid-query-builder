import { Show, For, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import {
  createDraggable,
  createDroppable,
  DragOverlay,
  transformStyle,
  useDragDropContext,
} from '@thisbeyond/solid-dnd';

import { ValueEditor } from './ValueEditor';
import ValueSelector from './ValueSelector';
import { ShiftActions } from './ShiftActions';
import { DragHandle } from './DragHandle';

import { useQueryBuilderContext, useQueryBuilderDNDContext } from 'src/context';

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
  shiftUpDisabled: boolean;
  shiftDownDisabled: boolean;
};

type RefSetter<V> = (value: V) => void;

const combineRefs = <V,>(setRefA: RefSetter<V>, setRefB: RefSetter<V>): RefSetter<V> => {
  return ref => {
    setRefA(ref);
    setRefB(ref);
  };
};

const getFieldFromName = (field: string | null, fields: Fields[]) =>
  fields.find(f => f.name === field);

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

  const isDisabled = () => config().disabled || props.parentLocked || props.rule.locked;

  const [ruleOperators, setRuleOperators] = createSignal<OperatorsList | null>(null);

  const draggable = createDraggable(props.rule.id, { rule: props.rule, path: props.path });
  const droppable = createDroppable(props.rule.id, { rule: props.rule, path: props.path });
  const combinedRef = combineRefs(draggable.ref, droppable.ref);

  const [{ active }] = useDragDropContext()!;

  const { dndConfig, setRuleIdToPathMapping } = useQueryBuilderDNDContext();

  onMount(() => {
    setRuleIdToPathMapping(mapping => {
      return { ...mapping, [props.rule.id]: JSON.stringify(props.path) };
    });
  });

  createEffect(() => {
    setRuleIdToPathMapping(mapping => {
      return { ...mapping, [props.rule.id]: JSON.stringify(props.path) };
    });
  });

  createEffect(() => {
    if (props.rule.field) {
      setRuleOperators(
        getOperatorsFromField(props.rule.field, config().operators, config().fields),
      );
    }

    /* To make field, operator and field value as null if the field does not exist in Fields Data */
    if (getFieldFromName(props.rule.field, config().fields) === undefined) {
      dispatch({ type: 'set-field', payload: { path: props.path, field: null } });
      dispatch({ type: 'set-operator', payload: { path: props.path, operator: null } });
      dispatch({ type: 'set-field-value', payload: { path: props.path, fieldValue: null } });
    }
  });

  onCleanup(() => {
    setRuleIdToPathMapping(mapping => {
      const newMapping = { ...mapping };
      delete newMapping[props.rule.id];
      return newMapping;
    });
  });

  const checkIfValidDrop = () => {
    return active.draggable?.id !== active.droppable?.id && active.droppable?.id === props.rule.id;
  };

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
      tabIndex={0}
      ref={combinedRef}
      style={transformStyle(draggable.transform)}
      data-testid="rule"
      class={[
        'rule',
        'draggable-container',
        props.rule.locked ? 'rule-disabled' : '',
        dndConfig().dropPosition === 'top' && checkIfValidDrop() ? 'rule-drop-top' : '',
        dndConfig().dropPosition === 'bottom' && checkIfValidDrop() ? 'rule-drop-bottom' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-level={props.path.length}
      data-path={JSON.stringify(props.path)}
      data-rule-id={props.rule.id}
      aria-disabled={isDisabled()}
      data-disabled={isDisabled()}
      role="none"
      aria-label="Rule Container"
      aria-description={`This is a rule container with path ${JSON.stringify(props.path)}`}
    >
      {/*Rule Actions*/}
      <Show when={config().showShiftActions} fallback={null}>
        <ShiftActions
          path={props.path}
          shiftUpDisabled={props.parentLocked || props.rule.locked || props.shiftUpDisabled}
          shiftDownDisabled={props.parentLocked || props.rule.locked || props.shiftDownDisabled}
        />
      </Show>
      <Show when={config().allowDragAndDrop} fallback={null}>
        <DragHandle dragActivators={draggable.dragActivators} />
      </Show>
      {/*Rule Fields*/}
      <select
        name="fields"
        id={`fields-${props.rule.id}`}
        disabled={isDisabled()}
        value={props.rule.field ?? ''}
        onChange={e => {
          const field = config().fields.find((f: Fields) => f.name === e.target.value);
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
          when={config().controlElements.customOperators?.(currentFieldData()) === null}
          fallback={config().controlElements.customOperators?.(currentFieldData())}
        >
          <select
            name="operators"
            id={`operators-${props.rule.id}`}
            disabled={isDisabled()}
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
          when={config().controlElements.customValueEditor?.(customValueEditorProp()) === null}
          fallback={config().controlElements.customValueEditor?.(customValueEditorProp())}
        >
          <ValueEditor
            isDisabled={() => isDisabled()}
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
      <Show when={config().showNotToggle === 'both' || config().showNotToggle === 'rule'}>
        <label class="not-rule-toggle-label">
          <input
            class="not-rule-toggle"
            type="checkbox"
            name="not-rule-group"
            checked={props.rule.not}
            disabled={isDisabled()}
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
        disabled={isDisabled()}
        onClick={() => dispatch({ type: 'delete-rule', payload: { path: props.path } })}
      >
        Delete
      </button>
      <DragOverlay>
        <div class="drag-overlay">{currentFieldData()?.name}</div>
      </DragOverlay>
    </div>
  );
};
