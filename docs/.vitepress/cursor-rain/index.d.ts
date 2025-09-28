import { CursorRainEffect } from './CursorRainEffect';
import type { RainDropOptions, CursorRainEffect as ICursorRainEffect } from './types';
/**
 * Create a new cursor rain effect instance
 */
export declare function createCursorRainEffect(options?: RainDropOptions): ICursorRainEffect;
/**
 * Initialize cursor rain effect with default options
 * This is a convenience function for quick setup
 */
export declare function initCursorRain(options?: RainDropOptions): ICursorRainEffect;
/**
 * VitePress compatible initialization
 * This function ensures the effect works correctly in VitePress environment
 */
export declare function initCursorRainForVitePress(options?: RainDropOptions): ICursorRainEffect;
export { CursorRainEffect } from './CursorRainEffect';
export type { RainDropOptions, RainDrop, CursorRainEffect as ICursorRainEffect } from './types';
declare const _default: {
    createCursorRainEffect: typeof createCursorRainEffect;
    initCursorRain: typeof initCursorRain;
    initCursorRainForVitePress: typeof initCursorRainForVitePress;
    CursorRainEffect: typeof CursorRainEffect;
};
export default _default;
