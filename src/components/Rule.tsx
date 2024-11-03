import { createEffect, onCleanup, onMount, Show } from 'solid-js';
import {
  createDraggable,
  createDroppable,
  DragOverlay,
  transformStyle,
  useDragDropContext,
} from '@thisbeyond/solid-dnd';
import { useQueryBuilderContext, useQueryBuilderDNDContext } from 'src/context';

import type { Path, RuleType } from 'src/types';
import { ShiftActions } from './ShiftActions';
import { DragHandle } from './DragHandle';

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

export const Rule = (props: RuleProps) => {
  const draggable = createDraggable(props.rule.id, { rule: props.rule, path: props.path });
  const droppable = createDroppable(props.rule.id, { rule: props.rule, path: props.path });
  const combinedRef = combineRefs(draggable.ref, droppable.ref);

  const [{ active }] = useDragDropContext()!;

  const [, dispatch, config] = useQueryBuilderContext();
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
      aria-disabled={config().disabled || props.parentLocked || props.rule.locked}
      data-disabled={config().disabled || props.parentLocked || props.rule.locked}
    >
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
      Rule: {props.path} ==== {JSON.stringify(props.rule.id)}
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
      <DragOverlay>
        <div class="drag-overlay">{props.rule.field}</div>
      </DragOverlay>
    </div>
  );
};
