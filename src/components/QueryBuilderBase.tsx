import {
  DragDropProvider,
  DragDropSensors,
  type DragEvent,
  DragOverlay,
  closestCorners,
  useDragDropContext,
} from '@thisbeyond/solid-dnd';

import { useQueryBuilderContext } from 'src/context/QueryBuilderContext';

import { ConstraintDrag } from './ConstraintDrag';
import { RuleGroup } from './RuleGroup';
import { useQueryBuilderDNDContext } from 'src/context';

const DragOverlayWrapper = () => {
  const [{ active }] = useDragDropContext()!;
  return (
    <DragOverlay>
      <div class="drag-overlay">{active.draggable?.data.rule?.field}</div>
    </DragOverlay>
  );
};

export const QueryBuilderBase = () => {
  const { store: query, dispatch, config } = useQueryBuilderContext();
  const { dndConfig, setDropPosition } = useQueryBuilderDNDContext();

  let queryBuilderRef: HTMLDivElement;

  const onDragEndEventHandler = (event: DragEvent) => {
    const dropPosition = dndConfig().dropPosition;
    setDropPosition(null);
    if (event.droppable) {
      if (event.draggable.id === event.droppable.id) {
        return;
      }

      const sourcePath = JSON.parse(dndConfig().ruleIdToPathMapping[event.draggable.id]!);
      const destinationPath = JSON.parse(dndConfig().ruleIdToPathMapping[event.droppable.id]!);

      dispatch({
        type: 'move-rule',
        payload: {
          sourcePath,
          destinationPath,
          dropPosition,
        },
      });
    }
  };

  return (
    <div
      class={['query-builder', config().showBranches ? 'query-builder-branches' : '']
        .filter(Boolean)
        .join(' ')}
      ref={queryBuilderRef!}
    >
      <DragDropProvider collisionDetector={closestCorners} onDragEnd={onDragEndEventHandler}>
        <DragDropSensors />
        <ConstraintDrag queryBuilderRef={queryBuilderRef!} />
        <RuleGroup
          path={[]}
          query={query}
          parentLocked={false}
          shiftUpDisabled={true}
          shiftDownDisabled={true}
        />
        <DragOverlayWrapper />
      </DragDropProvider>
    </div>
  );
};
