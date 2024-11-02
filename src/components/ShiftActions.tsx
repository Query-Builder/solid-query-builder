import { useQueryBuilderContext } from 'src/context';
import { type Path } from 'src/types';

type ShiftActionsProps = {
  path: Path;
  shiftUpDisabled: boolean;
  shiftDownDisabled: boolean;
};

export const ShiftActions = (props: ShiftActionsProps) => {
  const [, dispatch, config] = useQueryBuilderContext();

  return (
    <div data-testid="shift-actions" class="shift-actions">
      <button
        data-testid="shift-up"
        disabled={config.disabled || props.shiftUpDisabled}
        onClick={() =>
          dispatch({
            type: 'shift-up',
            payload: { path: props.path },
          })
        }
      >
        &#8743;
      </button>
      <button
        data-testid="shift-down"
        disabled={config.disabled || props.shiftDownDisabled}
        onClick={() =>
          dispatch({
            type: 'shift-down',
            payload: { path: props.path },
          })
        }
      >
        &#8744;
      </button>
    </div>
  );
};