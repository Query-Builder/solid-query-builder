type Listeners = Record<string, (event: HTMLElementEventMap[keyof HTMLElementEventMap]) => void>;

type DragHandleProps = {
  dragActivators: Listeners;
};

export const DragHandle = (props: DragHandleProps) => {
  return (
    <span
      data-testid="drag-handle"
      class={['dragHandle', 'handle'].join(' ')}
      title="Drag Handle"
      {...props.dragActivators}
    >
      &#8942;&#8942;
    </span>
  );
};
