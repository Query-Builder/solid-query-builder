import { Show } from 'solid-js';
import { useQueryBuilderContext } from 'src/context';

import type { Path, RuleType } from 'src/types';
import { ShiftActions } from './ShiftActions';
import { DragHandle } from './DragHandle';
import {
  createDraggable,
  createDroppable,
  transformStyle,
  useDragDropContext,
} from '@thisbeyond/solid-dnd';

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
  const droppable = createDroppable(props.rule.id);
  const combinedRef = combineRefs(draggable.ref, droppable.ref);

  const [, dispatch, config] = useQueryBuilderContext();

  // TODO: move this to a different hook
  const [state] = useDragDropContext()!;

  const activeClass = () => {
    if (droppable.isActiveDroppable) {
      if (state.active.draggable?.data.rule.id === props.rule.id) {
        return 'droppable-reject';
      } else {
        return 'droppable-accept';
      }
    }
    return '';
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
        activeClass(),
        props.rule.locked ? 'rule-disabled' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-level={props.path.length}
      data-path={JSON.stringify(props.path)}
      data-rule-id={props.rule.id}
      aria-disabled={config.disabled || props.parentLocked || props.rule.locked}
      data-disabled={config.disabled || props.parentLocked || props.rule.locked}
    >
      {config.showShiftActions ? (
        <ShiftActions
          path={props.path}
          shiftUpDisabled={props.parentLocked || props.rule.locked || props.shiftUpDisabled}
          shiftDownDisabled={props.parentLocked || props.rule.locked || props.shiftDownDisabled}
        />
      ) : null}
      {config.allowDragAndDrop ? <DragHandle dragActivators={draggable.dragActivators} /> : null}
      Rule: {props.path} ==== {JSON.stringify(props.rule)}
      <Show when={config.showNotToggle === 'both' || config.showNotToggle === 'rule'}>
        <label>
          <input
            type="checkbox"
            name="not-rule-group"
            checked={props.rule.not}
            disabled={config.disabled || props.parentLocked || props.rule.locked}
            onChange={() => dispatch({ type: 'negate-rule', payload: { path: props.path } })}
          />
          Not
        </label>
      </Show>
      <button
        data-testid="lock-rule-button"
        class="lock-button"
        disabled={config.disabled || props.parentLocked}
        onClick={() => dispatch({ type: 'lock-rule', payload: { path: props.path } })}
      >
        Lock
      </button>
      <button
        data-testid="delete-rule-button"
        class="delete-button"
        disabled={config.disabled || props.parentLocked || props.rule.locked}
        onClick={() => dispatch({ type: 'delete-rule', payload: { path: props.path } })}
      >
        Delete
      </button>
    </div>
  );
};
