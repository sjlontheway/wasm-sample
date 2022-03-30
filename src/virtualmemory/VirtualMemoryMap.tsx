import React, { useEffect, useRef, useState } from 'react';
import {
    ISegment,
    IProcessData,
    RectInfo as RectType,
    ISourceLib,
} from './types';
import { data as metaData } from '../data/virturalMemory';
import { createSourceLibList, layout } from './MemoryHelper';
import { Canvas, parseDimension, Rect } from '@antv/g';
import { Renderer } from '@antv/g-canvas';

const defaultBarStyle = {
    padding: 16,
    barWidth: 20,
    gapSegmentHeight: 20,
    minSegmentHeight: 20,
};
const VirtualMemoryMap: React.FC<any> = (props) => {
    useEffect(() => {
        const sourceLibs = createSourceLibList(metaData);
        const size = layout(sourceLibs, 10, defaultBarStyle);
        const canvas = new Canvas({
            container: 'container',
            width: size[0],
            height: size[1],
            renderer: new Renderer(),
        });

        const backgroundNode = new Rect({
            style: {
                fill: 'gray',
                width: defaultBarStyle.barWidth,
                height: size[1] - defaultBarStyle.padding * 2,
            },
            capture: false,
        });

        backgroundNode.setPosition(
            defaultBarStyle.padding,
            defaultBarStyle.padding
        );
        canvas.appendChild(backgroundNode);

        backgroundNode.addEventListener('mousemove', (e) => {
            console.log('touchmove');
            backgroundNode.translate(0, 1);
        });

        const onHoverParent = (e: Event, segment: ISegment) => {
            segment?.parent?.showBound();
        };

        const onHoverOutParent = (e: Event, segment: ISegment) => {
            console.log(segment.parent);
            segment?.parent?.hideBound();
        };

        const onClickSegment = (e: Event, segment: ISegment) => {
            console.log(segment);
        };

        for (let sourceLib of sourceLibs) {
            sourceLib.render(canvas);
            for (let segment of sourceLib.segments) {
                const { renderRect } = segment;
                if (!renderRect) {
                    continue;
                }
                const { fillColor } = segment.options;
                const node = new Rect({
                    style: {
                        fill: fillColor,
                        width: renderRect?.width || 0,
                        height: renderRect?.height || 0,
                        cursor: 'pointer',
                    },
                });

                node.addEventListener('mouseenter', (e) =>
                    onHoverParent(e, segment)
                );
                node.addEventListener('mouseleave', (e) => {
                    onHoverOutParent(e, segment);
                });

                node.addEventListener('click', (e) =>
                    onClickSegment(e, segment)
                );

                node.setPosition(
                    renderRect?.x - defaultBarStyle.padding,
                    renderRect.y - defaultBarStyle.padding
                );
                backgroundNode.appendChild(node);
            }
        }

        return () => canvas.destroy();
    });
    return <div id="container"></div>;
};

export default VirtualMemoryMap;
