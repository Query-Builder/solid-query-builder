import { DragDropProvider, DragDropSensors, closestCorners } from '@thisbeyond/solid-dnd';

import { QueryBuilderBase } from './components';
import { QueryBuilderProvider } from './context/QueryBuilderContext';

import type { QueryBuilderConfig } from './types';

import './styles.css';

// all types
export * from './types';

type QueryBuilderProps = QueryBuilderConfig;

export const QueryBuilder = (props: QueryBuilderProps) => {
  return (
    <DragDropProvider
      collisionDetector={closestCorners}
      onDragStart={event => console.log('onDragStart', event)}
      onDragEnd={event => console.log('onDragEnd', event)}
      onDragMove={event => console.log('onDragMove', event)}
      onDragOver={event => console.log('onDragOver', event)}
    >
      <DragDropSensors />
      <QueryBuilderProvider {...props}>
        <QueryBuilderBase />
      </QueryBuilderProvider>
    </DragDropProvider>
  );
};
