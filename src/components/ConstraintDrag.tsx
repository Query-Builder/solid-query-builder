import { useDragDropContext, type Transformer } from '@thisbeyond/solid-dnd';
import { unwrap } from 'solid-js/store';
import { useQueryBuilderDNDContext } from 'src/context';
import { type Path } from 'src/types';
import { restrictToBoundingRect } from 'src/utils';

type ConstraintDragProps = {
  queryBuilderRef: HTMLDivElement;
};

export const ConstraintDrag = (props: ConstraintDragProps) => {
  // TODO: add wrapper for this context to handle null conditions...
  const [{ active }, { onDragStart, onDragMove, onDragEnd, addTransformer, removeTransformer }] =
    useDragDropContext()!;

  const { setDropPosition } = useQueryBuilderDNDContext();

  const restrictToQueryBuilderContainer: Transformer = {
    id: 'restrict-to-query-builder-container',
    order: 100,
    callback: transform => {
      if (active.draggable && active.overlay) {
        const { top, height, bottom, left, right, width } =
          props.queryBuilderRef.getBoundingClientRect();

        return {
          ...restrictToBoundingRect(
            transform,
            {
              top: active.overlay.layout.top,
              bottom: active.overlay.layout.bottom,
              left: active.overlay.layout.left,
              right: active.overlay.layout.right,
              width: active.overlay.layout.width,
              height: active.overlay.layout.height,
            },
            {
              left,
              bottom,
              right,
              width,
              top: top - 10,
              height: height + 40,
            },
          ),
        };
      }

      return transform;
    },
  };

  onDragStart(({ draggable }) => {
    addTransformer('draggables', draggable.id, restrictToQueryBuilderContainer);
  });

  onDragMove(() => {
    if (active.draggable && active.droppable && active.overlay) {
      // console.log();
      if (active.draggable.id === active.droppable.id) {
        return;
      }
      const draggablePath = active.draggable.data.path as Path;
      const droppablePath = active.droppable.data.path as Path;

      const draggablePathIdx = draggablePath.slice(-1)[0] ?? -1;
      const droppablePathIdx = droppablePath.slice(-1)[0] ?? -1;

      if (draggablePathIdx < 0 || droppablePathIdx < 0) {
        return;
      }

      console.log('first', draggablePath, droppablePath, draggablePathIdx, droppablePathIdx);

      if (active.overlay.transformed.center.y < active.droppable.transformed.center.y) {
        if (
          draggablePathIdx >= 0 &&
          droppablePathIdx >= 0 &&
          // if droppable is the next sibling of draggable
          draggablePathIdx === droppablePathIdx - 1
        ) {
          return;
        }

        // console.log('top');
        setDropPosition('top');
      } else {
        // console.log('bottom');
        if (
          draggablePathIdx >= 0 &&
          droppablePathIdx >= 0 &&
          // if droppable is the previous sibling of draggable
          draggablePathIdx === droppablePathIdx + 1
        ) {
          return;
        }

        setDropPosition('bottom');
      }
    }
  });

  onDragEnd(({ draggable }) => {
    // removeTransformer('draggables', draggable.id, restrictToYAxis.id);
    removeTransformer('draggables', draggable.id, restrictToQueryBuilderContainer.id);
  });

  return <></>;
};
