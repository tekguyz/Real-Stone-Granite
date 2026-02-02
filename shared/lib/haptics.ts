/**
 * HAPTICS SYSTEM: Industrial Weight
 * Designed to provide physical feedback for high-end interactions.
 */

const canVibrate = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

export const HAPTICS = {
  /**
   * MECHANICAL_CLICK: A sharp, short pulse for primary buttons.
   * Mimics the snap of a physical high-precision switch.
   */
  click: () => {
    if (canVibrate) navigator.vibrate(12);
  },

  /**
   * SLAB_SHIFT: A slightly deeper pulse for heavy UI transitions.
   * Used when switching massive stone samples.
   */
  heavy: () => {
    if (canVibrate) navigator.vibrate(22);
  },

  /**
   * SUCCESS_STAMP: A rhythmic double pulse.
   * Used for final project submission.
   */
  success: () => {
    if (canVibrate) navigator.vibrate([10, 40, 10]);
  },

  /**
   * ERROR_ALERT: A warning pattern.
   */
  error: () => {
    if (canVibrate) navigator.vibrate([50, 50, 50]);
  }
};
