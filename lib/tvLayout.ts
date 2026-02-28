/**
 * TV frame layout: derived from tv.png dimensions and cutout position.
 *
 * Source image: 767 × 839 px
 * Cutout: 624 × 455 px, horizontally centered, y = 190 from top
 *
 * Use these values to position and clip the tank content inside the TV.
 * Background images should match the cutout aspect ratio (624:455) to fill
 * the screen without stretching.
 */

export const TV_IMAGE_WIDTH = 767;
export const TV_IMAGE_HEIGHT = 839;

/** Cutout size in pixels (use this aspect ratio for background images) */
export const SCREEN_CUTOUT_WIDTH = 624;
export const SCREEN_CUTOUT_HEIGHT = 455;

/** Cutout position in pixels: top offset, horizontally centered */
export const SCREEN_CUTOUT_TOP = 190;

/** Aspect ratio of the visible screen (width / height) */
export const SCREEN_ASPECT_RATIO = SCREEN_CUTOUT_WIDTH / SCREEN_CUTOUT_HEIGHT;

/**
 * SCREEN_RECT: inset percentages so the tank content aligns with the TV cutout.
 * Applied as top/right/bottom/left on a child that fills the TV container.
 */
export const SCREEN_RECT = {
  top: `${(SCREEN_CUTOUT_TOP / TV_IMAGE_HEIGHT) * 100}%`,
  left: `${((TV_IMAGE_WIDTH - SCREEN_CUTOUT_WIDTH) / 2 / TV_IMAGE_WIDTH) * 100}%`,
  right: `${((TV_IMAGE_WIDTH - SCREEN_CUTOUT_WIDTH) / 2 / TV_IMAGE_WIDTH) * 100}%`,
  bottom: `${((TV_IMAGE_HEIGHT - SCREEN_CUTOUT_TOP - SCREEN_CUTOUT_HEIGHT) / TV_IMAGE_HEIGHT) * 100}%`,
} as const;

/** Exact percentage numbers if you need them for inline styles */
export const SCREEN_RECT_PERCENT = {
  top: (SCREEN_CUTOUT_TOP / TV_IMAGE_HEIGHT) * 100,
  left: ((TV_IMAGE_WIDTH - SCREEN_CUTOUT_WIDTH) / 2 / TV_IMAGE_WIDTH) * 100,
  right: ((TV_IMAGE_WIDTH - SCREEN_CUTOUT_WIDTH) / 2 / TV_IMAGE_WIDTH) * 100,
  bottom: ((TV_IMAGE_HEIGHT - SCREEN_CUTOUT_TOP - SCREEN_CUTOUT_HEIGHT) / TV_IMAGE_HEIGHT) * 100,
} as const;
