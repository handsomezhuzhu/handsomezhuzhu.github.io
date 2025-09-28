import { gsap } from 'gsap';

class CursorRainEffect {
    constructor(options = {}) {
        this.rainContainer = null;
        this.drops = [];
        this.isInitialized = false;
        this.mouseMoveHandler = null;
        this.timeoutId = null;
        this.animationPool = [];
        this.options = {
            maxDrops: options.maxDrops ?? 50,
            dropSize: options.dropSize ?? [2, 8],
            color: options.color ?? 'rgba(173, 216, 230, 0.8)',
            duration: options.duration ?? [0.8, 1.5],
            delay: options.delay ?? 100,
            enabled: options.enabled ?? true,
            zIndex: options.zIndex ?? 9999,
            container: options.container ?? document.body
        };
        this.container = this.options.container;
    }
    init() {
        if (this.isInitialized) {
            return;
        }
        this.createRainContainer();
        this.setupEventListeners();
        this.preCreateDrops();
        this.isInitialized = true;
    }
    destroy() {
        if (!this.isInitialized) {
            return;
        }
        this.cleanup();
        this.isInitialized = false;
    }
    enable() {
        this.options.enabled = true;
        if (this.isInitialized) {
            this.setupEventListeners();
        }
    }
    disable() {
        this.options.enabled = false;
        this.removeEventListeners();
    }
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        if (newOptions.container && newOptions.container !== this.container) {
            this.container = newOptions.container;
            if (this.isInitialized) {
                this.destroy();
                this.init();
            }
        }
    }
    createRainContainer() {
        this.rainContainer = document.createElement('div');
        this.rainContainer.className = 'cursor-rain-container';
        this.rainContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: ${this.options.zIndex};
      overflow: hidden;
    `;
        this.container.appendChild(this.rainContainer);
    }
    preCreateDrops() {
        // Pre-create drop elements for better performance
        for (let i = 0; i < this.options.maxDrops; i++) {
            const drop = this.createDropElement();
            this.animationPool.push(drop);
            if (this.rainContainer) {
                this.rainContainer.appendChild(drop);
            }
        }
    }
    createDropElement() {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.cssText = `
      position: absolute;
      background: ${this.options.color};
      border-radius: 50% 50% 50% 50% / 90% 90% 10% 10%;
      pointer-events: none;
      opacity: 0;
      transform-origin: center bottom;
    `;
        return drop;
    }
    setupEventListeners() {
        if (!this.options.enabled) {
            return;
        }
        this.removeEventListeners();
        this.mouseMoveHandler = this.throttle((e) => {
            this.createRainAtPosition(e.clientX, e.clientY);
        }, 16); // ~60fps throttling
        document.addEventListener('mousemove', this.mouseMoveHandler, { passive: true });
    }
    removeEventListeners() {
        if (this.mouseMoveHandler) {
            document.removeEventListener('mousemove', this.mouseMoveHandler);
            this.mouseMoveHandler = null;
        }
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
    createRainAtPosition(x, y) {
        if (!this.rainContainer || this.drops.length >= this.options.maxDrops) {
            return;
        }
        // Get available drop from pool
        const dropElement = this.getAvailableDrop();
        if (!dropElement) {
            return;
        }
        const size = this.randomBetween(this.options.dropSize[0], this.options.dropSize[1]);
        const duration = this.randomBetween(this.options.duration[0], this.options.duration[1]);
        // Add some randomness to position
        const offsetX = this.randomBetween(-20, 20);
        const offsetY = this.randomBetween(-10, 10);
        const finalX = x + offsetX;
        const finalY = y + offsetY;
        const drop = {
            element: dropElement,
            x: finalX,
            y: finalY,
            size,
            isAnimating: true
        };
        this.drops.push(drop);
        // Set initial position and size
        gsap.set(dropElement, {
            x: finalX - size / 4, // 调整X偏移，因为宽度变小了
            y: finalY - size / 2,
            width: size * 0.3, // 宽度减小到原来的30%，让雨滴更细
            height: size * 4, // 高度增加到4倍，让雨滴更长
            opacity: 0,
            scaleY: 0.1,
            rotation: this.randomBetween(-15, 15)
        });
        // Animate the raindrop - continuous fall with gradual rotation change
        const initialRotation = this.randomBetween(-15, 15); // 初始随机角度
        const fallDistance = window.innerHeight - finalY + 100;
        const tl = gsap.timeline({
            onComplete: () => {
                this.returnDropToPool(drop);
            }
        });
        // 快速出现
        tl.to(dropElement, {
            opacity: 1,
            scaleY: 1,
            duration: 0.1,
            ease: 'power2.out'
        })
            // 连续下落：一次性完成整个下落过程，同时角度逐渐变垂直
            .to(dropElement, {
            y: `+=${fallDistance}`, // 一次性完成所有下落距离
            x: `+=${initialRotation * 0.3}`, // 轻微的水平漂移
            scaleY: 1.5, // 逐渐拉长
            opacity: 0.3, // 逐渐变透明
            rotation: 0, // 角度从初始角度平滑变为垂直
            duration: duration,
            ease: 'power1.in' // 重力加速效果
        }, 0.05);
    }
    getAvailableDrop() {
        return this.animationPool.find(drop => gsap.getTweensOf(drop).length === 0) || null;
    }
    returnDropToPool(drop) {
        const index = this.drops.indexOf(drop);
        if (index > -1) {
            this.drops.splice(index, 1);
        }
        drop.isAnimating = false;
        // Reset the element
        gsap.set(drop.element, {
            opacity: 0,
            x: 0,
            y: 0,
            scaleY: 1,
            rotation: 0
        });
    }
    randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }
    throttle(func, delay) {
        let timeoutId = null;
        let lastExecTime = 0;
        return (...args) => {
            const currentTime = Date.now();
            if (currentTime - lastExecTime > delay) {
                func(...args);
                lastExecTime = currentTime;
            }
            else {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = window.setTimeout(() => {
                    func(...args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
    cleanup() {
        this.removeEventListeners();
        // Kill all GSAP animations
        this.drops.forEach(drop => {
            gsap.killTweensOf(drop.element);
        });
        this.drops = [];
        this.animationPool = [];
        if (this.rainContainer && this.rainContainer.parentNode) {
            this.rainContainer.parentNode.removeChild(this.rainContainer);
            this.rainContainer = null;
        }
    }
}

/**
 * Create a new cursor rain effect instance
 */
function createCursorRainEffect(options) {
    return new CursorRainEffect(options);
}
/**
 * Initialize cursor rain effect with default options
 * This is a convenience function for quick setup
 */
function initCursorRain(options) {
    const effect = createCursorRainEffect(options);
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            effect.init();
        });
    }
    else {
        // DOM is already ready
        effect.init();
    }
    return effect;
}
/**
 * VitePress compatible initialization
 * This function ensures the effect works correctly in VitePress environment
 */
function initCursorRainForVitePress(options) {
    const effect = createCursorRainEffect({
        container: document.body,
        zIndex: 1000, // Lower z-index to avoid conflicts with VitePress UI
        ...options
    });
    // Handle VitePress page navigation
    const initEffect = () => {
        // Small delay to ensure VitePress has finished rendering
        setTimeout(() => {
            effect.init();
        }, 100);
    };
    // Handle both initial load and client-side navigation
    if (typeof window !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initEffect);
        }
        else {
            initEffect();
        }
        // Handle VitePress client-side navigation
        window.addEventListener('popstate', () => {
            effect.destroy();
            initEffect();
        });
        // Handle programmatic navigation (if using Vue Router)
        if (window.history && window.history.pushState) {
            const originalPushState = window.history.pushState;
            window.history.pushState = function (...args) {
                originalPushState.apply(window.history, args);
                effect.destroy();
                initEffect();
            };
        }
    }
    return effect;
}
// Default export for convenience
var index = {
    createCursorRainEffect,
    initCursorRain,
    initCursorRainForVitePress,
    CursorRainEffect
};

export { CursorRainEffect, createCursorRainEffect, index as default, initCursorRain, initCursorRainForVitePress };
