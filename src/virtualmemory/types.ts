import { Canvas, Rect } from '@antv/g';

export type MetaData = {
    name: string;
    segments: SegmentMeta[];
};
export type SegmentMeta = {
    name: string;
    startVa: number;
    endVa: number;
    offset: number;
    permission?: string;
    fd?: string;
    blockPosition?: number;
};

export interface IProcessData {
    // segments: ISegment[];
}

export type RectInfo = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type fillRectStyle = {
    fillColor: string;
    strokeColor?: string;
    strokenWidth?: number;
};

export interface ISegmentOptions {
    // 填充颜色
    fillColor: string;

    // // 渲染区域;
    // renderRect: Rect;

    // 起点VA
    startVa: number;

    // 映射区域应用名称或者库名称
    name: string;

    // 终点VA
    endVa: number;
}

export interface ISourceLib {
    renderRect: RectInfo | undefined;

    startVa: number;

    endVa: number;

    segments: ISegment[];

    setRenderRect(rect: RectInfo): void;

    render(cavas: Canvas): void;

    showBound(): void;

    hideBound(): void;
}

export interface ISegment {
    // 段位置
    options: ISegmentOptions;

    parent: ISourceLib | undefined;

    renderRect: undefined | RectInfo;

    render(ctx: CanvasRenderingContext2D): void;

    getVABytes(): number;

    layout(x: number, y: number, width: number, height: number): RectInfo;

    isInRange(x: number, y: number): boolean;
}

export interface IAppSegmentOptions extends ISegmentOptions {
    status: 'normal | hover';
}
