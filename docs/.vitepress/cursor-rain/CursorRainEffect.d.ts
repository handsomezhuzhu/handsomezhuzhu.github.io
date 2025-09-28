import type { RainDropOptions, CursorRainEffect as ICursorRainEffect } from './types';
export declare class CursorRainEffect implements ICursorRainEffect {
    private options;
    private container;
    private rainContainer;
    private drops;
    private isInitialized;
    private mouseMoveHandler;
    private timeoutId;
    private animationPool;
    constructor(options?: RainDropOptions);
    init(): void;
    destroy(): void;
    enable(): void;
    disable(): void;
    updateOptions(newOptions: Partial<RainDropOptions>): void;
    private createRainContainer;
    private preCreateDrops;
    private createDropElement;
    private setupEventListeners;
    private removeEventListeners;
    private createRainAtPosition;
    private getAvailableDrop;
    private returnDropToPool;
    private randomBetween;
    private throttle;
    private cleanup;
}
