import {
  DragDropProvider,
  DragDropSensors,
  type DragEvent,
  closestCorners,
} from '@thisbeyond/solid-dnd';

import { useQueryBuilderContext } from 'src/context/QueryBuilderContext';

import { ConstraintDrag } from './ConstraintDrag';
import { RuleGroup } from './RuleGroup';
import { useQueryBuilderDNDContext } from 'src/context';

export const QueryBuilderBase = () => {
  const [query, dispatch] = useQueryBuilderContext();
  const { dndConfig, setDropPosition } = useQueryBuilderDNDContext();
  let queryBuilderRef: HTMLDivElement;

  const onDragEndEventHandler = (event: DragEvent) => {
    console.log('event', event);
    const dropPosition = dndConfig().dropPosition;
    setDropPosition(null);
    if (event.droppable) {
      if (event.draggable.id === event.droppable.id) {
        return;
      }
      console.log('droppedPath', event.droppable.data.path);
      console.log('draggablePath', event.draggable.data.path);
      console.log('dropPosition', dropPosition);
      dispatch({
        type: 'move-rule',
        payload: {
          sourcePath: event.draggable.data.path,
          destinationPath: event.droppable.data.path,
          dropPosition,
        },
      });
    }
  };

  return (
    <div class="query-builder" ref={queryBuilderRef!}>
      <DragDropProvider
        collisionDetector={closestCorners}
        // onDragStart={onDragStart}
        onDragEnd={onDragEndEventHandler}
        // onDragMove={event => console.log('onDragMove', event)}
        // onDragOver={event => console.log('onDragOver', event)}
      >
        <DragDropSensors />
        <ConstraintDrag queryBuilderRef={queryBuilderRef!} />
        <RuleGroup
          path={[]}
          query={query}
          parentLocked={false}
          shiftUpDisabled={true}
          shiftDownDisabled={true}
        />
      </DragDropProvider>
    </div>
  );
};
