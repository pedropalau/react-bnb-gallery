export const Direction = {
  PREV: "prev",
  NEXT: "next",
  LEFT: "left",
  RIGHT: "right",
};

export const PointerType = {
  TOUCH: "backwards",
  PEN: "pen",
};

export const FORWARDS = "forwards";

export const BACKWARDS = "backwards";

export const SHOW_PHOTO_LIST_LABEL = "Show photo list";

export const HIDE_PHOTO_LIST_LABEL = "Hide photo list";

// KeyboardEvent.which value for left arrow key
export const ARROW_LEFT_KEYCODE = 37;

// KeyboardEvent.which value for right arrow key
export const ARROW_RIGHT_KEYCODE = 39;

// KeyboardEvent.which value for esc key
export const ESC_KEYCODE = 27;

// Time for mouse compat events to fire after touch
export const TOUCHEVENT_COMPAT_WAIT = 500;

export const SWIPE_THRESHOLD = 40;

export const THUMBNAIL_WIDTH = 100;

export const THUMBNAIL_HEIGHT = 67;

export const THUMBNAIL_OFFSET = 10;

export const Phrases = {
  EMPTY_MESSAGE: "No photos to show",
  SHOW_PHOTO_LIST_LABEL: "Show photo list",
  HIDE_PHOTO_LIST_LABEL: "Hide photo list",
};

export const defaultPhotoProps = {
  number: 0,
  photo: undefined,
  caption: undefined,
  subcaption: undefined,
  thumbnail: undefined,
};;
