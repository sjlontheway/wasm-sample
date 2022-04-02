import {
    IDataSource,
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
    private cacheItemIndexList: number[];
    private startItemPosition: number = -1;
    private cacheMap = new Map<number, ScreenItem<T>>();

    constructor(private options: IOffScreenCacheOptions<T>) {
        const { dataSource, cacheSize } = this.options;
        this.cacheItemIndexList = new Array(cacheSize);
    }

    setCacheStartItem(startPostion: number): void {
        console.log('setCacheStartItem:',startPostion, this.startItemPosition)

        if (startPostion >= 0 && startPostion === this.startItemPosition) {
            return;
        }
        const { dataSource, cacheSize, width, height, renderItem } =
            this.options;

        let newStartItemPosition = startPostion;
        let newEndItemPostion = startPostion + cacheSize;

        let disuseStartItemIndex = this.startItemPosition;
        let disuseEndIndex = this.startItemPosition + cacheSize;

        if (
            this.startItemPosition > startPostion &&
            this.startItemPosition < startPostion + cacheSize
        ) {
            disuseStartItemIndex = newEndItemPostion;
            newEndItemPostion = this.startItemPosition;
        }

        if (
            startPostion > this.startItemPosition &&
            startPostion < this.startItemPosition + cacheSize
        ) {
            newStartItemPosition = disuseEndIndex;
            disuseEndIndex = startPostion;
        }

        let redrawIndex = newStartItemPosition;
        for (let i = disuseStartItemIndex; i < disuseEndIndex; i++) {
            const reuseScreen = this.cacheMap.get(i);
            this.cacheMap.delete(i);

            if (reuseScreen && redrawIndex < newEndItemPostion) {
                const data = dataSource.getDataByPosition(redrawIndex);
                reuseScreen.reRender(data, redrawIndex);
                this.cacheMap.set(redrawIndex, reuseScreen);
                redrawIndex++;
            }
        }
        if (redrawIndex < newEndItemPostion) {
            for (let i = redrawIndex; i < newEndItemPostion; i++) {
                const data = dataSource.getDataByPosition(i);
                const screen = new ScreenItem({
                    width,
                    height,
                    itemIndex: i,
                    itemRenderData: data,
                    renderItem,
                });
                this.cacheMap.set(i, screen);
            }
        }
        this.startItemPosition = startPostion;
    }

    getCache(position: number): ScreenItem<T> | undefined {

        return this.cacheMap.get(position);
    }
}

export default OffScreenItemCache;
