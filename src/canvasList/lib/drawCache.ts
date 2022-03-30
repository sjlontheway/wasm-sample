import {
    IOffScreenCache,
    IOffScreenCacheOptions,
    IOffScreenItem,
    IOffScreenItemOptions,
} from '../types';

export class ScreenItem<T> implements IOffScreenItem<T> {
    private offScreenCanvase: OffscreenCanvas;
    private ctx: OffscreenCanvasRenderingContext2D | null;
    constructor(private options: IOffScreenItemOptions<T>) {
        this.offScreenCanvase = new OffscreenCanvas(
            this.options.width,
            this.options.height
        );
        this.ctx = this.offScreenCanvase.getContext('2d');
        if (!this.ctx) {
            throw new Error('Not support OffScreenCanvas!');
        }
        this.options.renderItem(
            this.ctx,
            this.options.itemRenderData,
            this.options.itemIndex
        );
    }

    public getScreenCanvas() {
        return this.offScreenCanvase;
    }

    public reRender(itemRenderData: T, itemIndex: number) {
        if (this.ctx) {
            const { width, height, renderItem } = this.options;
            this.options.itemRenderData = itemRenderData;
            this.options.itemIndex = itemIndex;
            this.ctx?.clearRect(0, 0, width, height);
            renderItem(
                this.ctx,
                this.options.itemRenderData,
                this.options.itemIndex
            );
        }
    }
}

class OffScreenItemCache<T> implements IOffScreenCache<T> {
    private cache = new Map();

    constructor(private options: IOffScreenCacheOptions<T>) {}

    setCache(postion: number, cacheCanvas: OffscreenCanvas): void {
        this.cache.set(postion, cacheCanvas);
    }

    getCache(position: number): ScreenItem<T>  {
        return this.cache.get(position);
    }
}

export default OffScreenItemCache;
