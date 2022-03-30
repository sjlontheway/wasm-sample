import React, { useEffect, useRef } from 'react';
import CanvasRenderer from './lib/InfinitDragCanvas';
import { IDataSource } from './types';
import {getCustomColor, getRandomColor} from '../utils/x11Color'
interface CanvasListProps {
    width: number;
    height: number;
    // onRenderItem: (
    //     item: any,
    //     index: number,
    //     ctx: CanvasRenderingContext2D
    // ) => void;
}

const dataLoader = (startIndex: number, endIndex: number) => {
    const res = [];
    for (let i = startIndex; i <= endIndex; i++) {
        res.push(i);
    }
    return res;
};

class DataLoader implements IDataSource<number> {
    getDataByPosition(position: number): number {
        return position;
    }
    getRangeDataByIndex(
        startIndex: number,
        endIndex: number
    ): Promise<number[]> {
        return new Promise((res, rej) => {
            const data = [];
            for (let i = startIndex; i <= endIndex; i++) {
                data.push(i);
            }
            res(data);
        });
    }
}

const CavasList: React.FC<CanvasListProps> = (props: CanvasListProps) => {
    const { width, height } = props;
    const ref = useRef(null);
    let canvas: CanvasRenderer<number>;

    useEffect(() => {
        if (!canvas) {
            const container = ref.current;

            if (container) {
                const dataLoader = new DataLoader();
                canvas = new CanvasRenderer<number>(container, {
                    width,
                    height,
                    direction: 'horizonal',
                    dataLoader,
                    showingScreenIndex: 0,
                    itemSize: 1000,
                    renderItem: (ctx, data, position) => {
                        const { width, height } = ctx.canvas;
                        ctx.save();
                        ctx.fillStyle = getCustomColor(position);
                        ctx.fillRect(0,0,width,height);
                        ctx.restore();
                        ctx.fillText(data + '', width / 2, height / 2);

                    },
                });

                canvas.render(4);
            }
        }
    });

    return (
        <div style={{ width, height,overflow:'hidden' }} className="container" ref={ref}></div>
    );
};

export default CavasList;
