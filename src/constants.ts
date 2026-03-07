export const DIRECTION_PREV = 'prev';
export const DIRECTION_NEXT = 'next';

export const ARROW_LEFT_KEYCODE = 37;
export const ARROW_RIGHT_KEYCODE = 39;
export const ESC_KEYCODE = 27;

export const DEFAULT_OPACITY = 1;
export const DEFAULT_Z_INDEX = 2000;

export const MIN_ZOOM = 1;
export const DEFAULT_ANIMATION_PRESET = 'slide';
export const DEFAULT_ANIMATION_DURATION_MS = 220;
export const DEFAULT_ANIMATION_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
export const DEFAULT_FEEDBACK_SCALE = 0.97;

export const DEFAULT_OPEN_ANIMATION_PRESET = 'fade-up';
export const DEFAULT_OPEN_ANIMATION_DURATION_MS = 240;
export const DEFAULT_OPEN_ANIMATION_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
export const DEFAULT_CLOSE_ANIMATION_PRESET = 'fade';
export const DEFAULT_CLOSE_ANIMATION_DURATION_MS = 180;
export const DEFAULT_CLOSE_ANIMATION_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

/** Path coordinates stay within the 24x24 viewBox bounds to avoid icon clipping. */
export const CLOSE_BUTTON_PATH =
	'm23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s.29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22';
export const PREV_BUTTON_ARROW_PATH =
	'm13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z';
export const NEXT_BUTTON_ARROW_PATH =
	'm4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z';
