export interface ICanvasListRender<T> {
    /**
     * 渲染数据
     * @param showingPosition 显示index
     */
    render(showingPosition: number): void;
}

export interface ICanvasListRendererOptions<T> {
    width: number;
    height: number;
    direction: Direction;
    dataLoader: IDataSource<T>;
    showingScreenIndex: number;
    itemSize: number;
    renderItem(
        ctx: OffscreenCanvasRenderingContext2D,
        data: T,
        position: number
    ): void;
}

export interface IDataSource<T> {
    getDataByPosition(position: number): T;

    getRangeDataByIndex(startIndex: number, endIndex: number): Promise<T[]>;
}

export type Postion = {
    x: number;
    y: number;
};

export type Direction = 'horizonal' | 'vertical';

export interface IDragCanvasListener {
    onDragStart?(translateX: number, translateY: number): void;

    onDrag(deltaX: number, deltaY: number): void;

    onDragEnd?(): void;
}

export interface IDragEventHelper {
    registerDragCanvasEvent(listener: IDragCanvasListener): void;
    unregisterDragCanvasEvent(listener: IDragCanvasListener): void;
    resetPosition(deltaX: number, deltaY: number): void;
}

export interface IOffScreenCache<T> {
    setCacheStartItem(postion: number): void;

    getCache(postion: number): IOffScreenItem<T> | undefined;
}

export interface IOffScreenItem<T> {
    getScreenCanvas(): OffscreenCanvas;
    reRender(itemRenderData: T, itemIndex: number): void;
}

export interface IOffScreenItemOptions<T> {
    itemIndex: number;
    width: number;
    height: number;
    itemRenderData: T;
    renderItem: (
        ctx: OffscreenCanvasRenderingContext2D,
        itemData: T,
        itemIndex: number
    ) => void;
}

export interface IOffScreenCacheOptions<T> {
    width: number;
    height: number;
    cacheSize: number;
    dataSource:IDataSource<T>;
    renderItem: (
        ctx: OffscreenCanvasRenderingContext2D,
        itemData: T,
        itemIndex: number
    ) => void;
}
