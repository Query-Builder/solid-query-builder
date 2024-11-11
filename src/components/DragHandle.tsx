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
      tab-index="-1"
      aria-hidden="true"
    >
      &#8942;&#8942;
    </span>
  );
};
