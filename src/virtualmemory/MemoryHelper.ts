import { Canvas, Rect } from '@antv/g';
import {
    ISegment,
    ISegmentOptions,
    RectInfo,
    ISourceLib,
    SegmentMeta,
    MetaData,
} from './types';

import { getCustomColor } from '../utils/x11Color';

export class Segment implements ISegment {
    parent: ISourceLib | undefined;

    constructor(public options: ISegmentOptions) {}

    renderRect: RectInfo | undefined;
    layout(x: number, y: number, width: number, height: number): RectInfo {
        this.renderRect = {
            x,
            y,
            width,
            height,
        };

        return this.renderRect;
    }

    render(ctx: CanvasRenderingContext2D): void {
        if (this.renderRect) {
            ctx.save();
            ctx.fillStyle = this.options.fillColor;
            ctx.fillRect(
                this.renderRect.x,
                this.renderRect.y,
                this.renderRect.width,
                this.renderRect.height
            );
            ctx.restore();
        }
    }

    isInRange(x: number, y: number): boolean {
        throw new Error('Method not implemented.');
    }

    getVABytes(): number {
        return this.options.endVa - this.options.startVa;
    }
}

export class SourceLib implements ISourceLib {
    renderRect: RectInfo | undefined;

    show: boolean = false;

    node: Rect | undefined;

    constructor(
        public segments: ISegment[],
        public name: string,
        public startVa: number,
        public endVa: number
    ) {}

    render(cavas: Canvas): void {
        if (this.renderRect) {
            this.node = new Rect({
                style: {
                    width: this.renderRect.width,
                    height: this.renderRect.height,
                    stroke: 'transparent',
                    lineWidth: 2,
                    zIndex:2
                },
                capture:false
            });
            this.node.setPosition(this.renderRect.x, this.renderRect.y);
            cavas.appendChild(this.node);
        }
    }

    showBound(): void {
        if (this.show || !this.node) {
            return;
        }
        this.show = true;
        this.node.attr('stroke', 'red');
    }

    hideBound(): void {
        if (!this.show || !this.node) {
            return;
        }

        this.show = false;
        this.node.attr('stroke', 'transparent');
    }

    public setRenderRect(rect: RectInfo) {
        this.renderRect = rect;
    }
}


export function createSourceLibList(metaDataList: MetaData[]) {
    const sourceList: ISourceLib[] = [];

    for (let i = 0; i < metaDataList.length; i++) {
        const metaData = metaDataList[i];
        const metaSegments = metaData.segments;
        const parentStartVa = metaSegments[0].startVa;
        const parenEndVa = metaSegments[metaSegments.length - 1].endVa;

        const segments: ISegment[] = [];

        for (let j = 0; j < metaSegments.length; j++) {
            const { startVa, endVa, name } = metaSegments[j];
            const segment = new Segment({
                startVa,
                endVa,
                fillColor: getCustomColor(j),
                name,
            });

            segments.push(segment);
        }
        const sourceLib = new SourceLib(
            segments,
            metaData.name,
            parentStartVa,
            parenEndVa
        );
        segments.forEach((s) => (s.parent = sourceLib));
        sourceList.push(sourceLib);
    }

    return sourceList;
}

export function layout(
    sourceList: ISourceLib[],
    pxToMb: number,
    {
        padding = 16,
        barWidth = 20,
        gapSegmentHeight = 20,
        minSegmentHeight = 20,
    } = {}
) {
    let startX, startY;
    startX = padding;
    startY = padding;

    let preVa = -1;
    for (let i = 0; i < sourceList.length; i++) {
        const sourceLib = sourceList[i];

        if (preVa > 0 && preVa + 4 < sourceLib.startVa) {
            startY += gapSegmentHeight;
        }
        let parentStartX = startX;
        let parentStartY = startY;

        preVa = sourceList[i].endVa;

        for (let segment of sourceList[i].segments) {
            let segmentHeight = Math.round(segment.getVABytes() / (1024 * 1024)) * pxToMb;

            if (segmentHeight < minSegmentHeight) {
                segmentHeight = minSegmentHeight;
            }

            segment.layout(startX, startY, barWidth, segmentHeight);
            startY += segmentHeight;
        }
        sourceLib.setRenderRect({
            x: parentStartX,
            y: parentStartY,
            width: barWidth,
            height: startY - parentStartY,
        });
    }

    return [padding * 2 + barWidth, startY + padding];
}
