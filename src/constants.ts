/** Navigation direction: move to the previous photo. */
export const DIRECTION_PREV = 'prev';
/** Navigation direction: move to the next photo. */
export const DIRECTION_NEXT = 'next';

/** Pointer input type: touch (finger). */
export const POINTER_TYPE_TOUCH = 'touch';
/** Pointer input type: stylus/pen. */
export const POINTER_TYPE_PEN = 'pen';

/** Swipe/scroll direction: forwards (left-to-right, next). */
export const FORWARDS = 'forwards';
/** Swipe/scroll direction: backwards (right-to-left, previous). */
export const BACKWARDS = 'backwards';

/** Key code for the left arrow key. */
export const ARROW_LEFT_KEYCODE = 37;
/** Key code for the right arrow key. */
export const ARROW_RIGHT_KEYCODE = 39;
/** Key code for the Escape key. */
export const ESC_KEYCODE = 27;
/** Key code for the Enter key. */
export const ENTER_KEYCODE = 13;
/** Key code for the Space key. */
export const SPACE_KEYCODE = 32;

/**
 * Delay in milliseconds to wait before handling touch events after a mouse
 * event, used to avoid double-firing on devices that emulate mouse events.
 */
export const TOUCHEVENT_COMPAT_WAIT = 500;
/** Minimum horizontal swipe distance in pixels required to trigger navigation. */
export const SWIPE_THRESHOLD = 40;

/** Default width of a thumbnail image in pixels. */
export const THUMBNAIL_WIDTH = 58;
/** Default height of a thumbnail image in pixels. */
export const THUMBNAIL_HEIGHT = 50;
/** Border width applied on each side of the thumbnail frame in pixels. */
export const THUMBNAIL_BORDER_WIDTH = 4;
/** Gap between adjacent thumbnails in pixels. */
export const THUMBNAIL_OFFSET = 8;

/** Default opacity for overlay/backdrop elements. */
export const DEFAULT_OPACITY = 1;
/** Default background color of the lightbox overlay (opaque black). */
export const DEFAULT_COLOR = 'rgba(0,0,0,1)';
/** Standard foreground/icon color (opaque white). */
export const NORMAL_COLOR = 'rgba(255,255,255,1)';
/** Inverted foreground/icon color (near-black, used on light backgrounds). */
export const INVERSE_COLOR = 'rgba(1,1,1,1)';
/** Default CSS z-index for the lightbox overlay, keeping it above most content. */
export const DEFAULT_Z_INDEX = 2000;
