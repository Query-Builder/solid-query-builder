type Transform = {
  x: number;
  y: number;
};

type Rect = {
  height: number;
  width: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export const restrictToBoundingRect = (
  transform: Transform,
  activeRect: Rect,
  boundingRect: Rect,
): Transform => {
  const value = {
    ...transform,
  };

  if (activeRect.top + transform.y <= boundingRect.top) {
    value.y = boundingRect.top - activeRect.top;
  } else if (activeRect.bottom + transform.y >= boundingRect.top + boundingRect.height) {
    value.y = boundingRect.top + boundingRect.height - activeRect.bottom;
  }
  if (activeRect.left + transform.x <= boundingRect.left) {
    value.x = boundingRect.left - activeRect.left;
  }
  // TODO: figure out a better way to restrict to right
  // else if (activeRect.right + transform.x >= boundingRect.left + boundingRect.width) {
  //   value.x = boundingRect.left + boundingRect.width - activeRect.right;
  // }

  return value;
};
