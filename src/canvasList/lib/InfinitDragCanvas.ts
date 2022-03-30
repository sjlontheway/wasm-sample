import {
    ICanvasListRender,
    ICanvasListRendererOptions,
    IDragCanvasListener,
} from '../types';
import { ScreenItem } from './drawCache';
import EventerHandler from './EventHandler';

class CanvasListRenderer<T>
    implements ICanvasListRender<T>, IDragCanvasListener
{
    private canvas: HTMLCanvasElement;

    private translateLen: number = 0;

    private eventHandler: EventerHandler;

    private renderScreenIndexList: number[] = [];

    private updatingThreshold = 0.5;

    private updatingThresholdLen = 0;

    private data: T[] = [];

    private cacheScreenMap = new Map();

    private currentShowItemIndex = 0;

    
    constructor(
        private container: HTMLDivElement,
        private options: ICanvasListRendererOptions<T>
    ) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.options.width * 3;
        this.canvas.height = this.options.height * 3;
        this.container.appendChild(this.canvas);
        this.eventHandler = new EventerHandler(this.canvas);
        this.eventHandler.registerDragCanvasEvent(this);
        this.updatingThresholdLen =
            this.options.direction === 'horizonal'
                ? this.options.width * this.updatingThreshold
                : this.options.height * this.updatingThreshold;
    }

    private _generatorRenderScreens(
        showingScreenIndex: number,
        updateTranslate: boolean
    ) {
        const baseSize =
            this.options.direction === 'horizonal'
                ? this.options.width
                : this.options.height;
        if (showingScreenIndex <= 0) {
            this.renderScreenIndexList = [0, 1, 2];
            if (updateTranslate) this.translateLen = 0;
        } else if (showingScreenIndex === this.options.itemSize) {
            this.renderScreenIndexList = [
                showingScreenIndex - 2,
                showingScreenIndex - 1,
                showingScreenIndex,
            ];
            if (updateTranslate) this.translateLen = -baseSize * 2;
        } else {
            this.renderScreenIndexList = [
                showingScreenIndex - 1,
                showingScreenIndex,
                showingScreenIndex + 1,
            ];
            if (updateTranslate) this.translateLen = -baseSize;
        }

        console.log('_generatorRenderScreens:', this.renderScreenIndexList);
    }

    private _renderScreen() {
        const ctx = this.canvas.getContext('2d');
        const width = this.options.width;
        for (let i = 0; i < this.renderScreenIndexList.length; i++) {
            const offScreenItem = this.cacheScreenMap.get(i);
            ctx?.drawImage(offScreenItem.getScreenCanvas(), i * width, 0);
        }
    }

    public render(showingItemIndex: number = 0) {
        this._render(showingItemIndex, true);
    }

    private _render(
        showingItemIndex: number = 0,
        updateTranslate: boolean = false
    ): void {
        this.currentShowItemIndex = showingItemIndex;
        this._generatorRenderScreens(showingItemIndex, updateTranslate);
        const { width, height, renderItem } = this.options;

        for (let i = 0; i < this.renderScreenIndexList.length; i++) {
            const renderScreenIndex = this.renderScreenIndexList[i];
            const data: T =
                this.options.dataLoader.getDataByPosition(renderScreenIndex);
            const screenItem = new ScreenItem({
                width,
                height,
                renderItem,
                itemRenderData: data,
                itemIndex: renderScreenIndex,
            });
            this.cacheScreenMap.set(i, screenItem);
        }
        if (updateTranslate) {
            this._translateDomContainer(this.translateLen);
        }
        this._renderScreen();
    }

    private _isReachMinBound() {
        return this.renderScreenIndexList[0] === 0;
    }

    private _isReachMaxBound() {
        return (
            this.renderScreenIndexList[
                this.renderScreenIndexList.length - 1
            ] ===
            this.options.itemSize - 1
        );
    }

    onDrag(deltaX: number, deltaY: number): void {
   
        const { width, height, direction } = this.options;
        let baseSize = width;
        let deltaSize = deltaX;
        if (direction === 'vertical') {
            baseSize = height;
            deltaSize = deltaY;
        }

        let tranlateLen = this.translateLen + deltaSize;

        //当前是左边界,滑动到第一屏，禁止左滑
        if (this._isReachMinBound() && deltaX > 0) {
            console.log('onDrag:left bound:', tranlateLen);
            tranlateLen = Math.min(0, tranlateLen);
        } else if (this._isReachMaxBound() && deltaX < 0) {
            //当前是右边界,滑动到最后一屏，禁止右滑
            console.log('onDrag:right bound');
            tranlateLen = Math.max(-baseSize * 2, tranlateLen);
        } else {
            // 往小索引方向移动
            if (deltaSize > 0 && tranlateLen >= -this.updatingThresholdLen) {
                console.log('onDrag update left item');
                this._renderMinDirNextItem();
                return;
            }
            console.log('onDrag:deltaX:', deltaX, tranlateLen);

            //往大索引方向拖拽
            if (
                deltaSize < 0 &&
                tranlateLen < -baseSize - this.updatingThresholdLen
            ) {
                console.log('onDrag update right item');
                this._renderMaxDirNextItem();
                return;
            }
        }
        if (this.translateLen !== tranlateLen) {
            this._translateDomContainer(tranlateLen);
        }
    }
    private _renderMaxDirNextItem() {
        this._render(this.currentShowItemIndex + 1, false);
        const { width, height, direction } = this.options;
        let resetX = width,
            resetY = 0;
        let baseSize = width;
        if (direction === 'vertical') {
            (resetX = 0), (resetY = height);
        }
        // 重置画布的滚动坐标系
        this.translateLen = baseSize + this.translateLen;
        this.eventHandler.resetPosition(resetX, resetY);
        this._translateDomContainer(this.translateLen);
    }

    private _renderMinDirNextItem() {
        this._render(this.currentShowItemIndex - 1, false);
        const { width, height, direction } = this.options;
        let baseSize = width;
        if (direction === 'vertical') {
            baseSize = height;
        }
        // resetPosition
        this.translateLen = -baseSize + this.translateLen;
        this.eventHandler.resetPosition(-baseSize, 0);
        this._translateDomContainer(this.translateLen);
    }

    private _translateDomContainer(tranlateL: number) {
       
        
        if (this.options.direction === 'horizonal') {
            this.canvas.style.transform = `translateX(${tranlateL}px)`;
        } else {
            this.canvas.style.transform = `translateY(${tranlateL}px)`;
        }

        this.translateLen = tranlateL;
    }

    _needUpdateCanvas() {}
}

export default CanvasListRenderer;
