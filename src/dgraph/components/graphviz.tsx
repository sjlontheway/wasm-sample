import React, { FC, useEffect } from 'react';
import G6, { Graph, IG6GraphEvent, IGraph } from '@antv/g6';

import FlowNodeType from '../node/BaseBlockNode';
import BezierEdgeType from '../node/BezierCombEdge';
import { FlowGraphProps, LineInfo } from '../types';
import './graphviz.css';

type K = Partial<keyof FlowGraphProps>;

function needUpdate(
    preprops: Readonly<FlowGraphProps>,
    currentProps: Readonly<FlowGraphProps>
): boolean {
    let isEqual =
        Object.keys(preprops).length === Object.keys(currentProps).length;

    if (!isEqual) {
        return isEqual;
    }
    const keys: K[] = Object.keys(preprops) as K[];
    for (let key in keys) {
        const keys = key as Partial<K>;
        if (preprops[keys] !== currentProps[keys]) {
            return false;
        }
    }

    return isEqual;
}

const GraphVizLayout: FC<FlowGraphProps> = (props: FlowGraphProps) => {
    console.log('GraphVizLayout render ---');
    const {
        width,
        height,
        edges,
        combos,
        nodes,
        onInstLineClick,
        showInstContextMenu,
        style,
    } = props;
    useEffect(() => {
        const minimap = new G6.Minimap({
            size: [window.innerWidth / 4, window.innerHeight / 4],
            className: 'minimap',
            type: 'delegate',
            delegateStyle: {
                x: 0,
                y: -1000,
            },
        });
        const grid = new G6.Grid({
            follow: false,
        });

        const graph = new Graph({
            container: 'graph-container',
            width: 800,
            height:1000,
            defaultNode: {
                type: FlowNodeType,
            },
            defaultCombo: {
                type: 'rect',
                style: {
                    radius: 4,
                },
            },

            plugins: [minimap, grid],
            modes: {
                default: ['drag-canvas', 'zoom-canvas'],
            },
            defaultEdge: {
                type: BezierEdgeType,
                style: {
                    endArrow: true,
                },
            },
        });
        graph.on('node:click', (e: IG6GraphEvent) => {
            const { item, shape } = e;
            if (!item) {
                return;
            }
            const group = shape.getParent();
            const graph = e.currentTarget as IGraph;

            if (group?.cfg?.lineInfo) {
                const lineInfo = group?.cfg?.lineInfo as LineInfo;
                const lineIndex = group?.cfg?.lineIndex;
                if (onInstLineClick) onInstLineClick(lineInfo, lineIndex);
                lineInfo.showBreakPoint = !lineInfo.showBreakPoint;
                graph.updateItem(item, {
                    lineIndex,
                });
            }
        });
        graph.data({ nodes, edges, combos });
        graph.zoom(0.1);
        graph.render();
        console.log('render');
        return () => graph.destroy();
    }, []);

    return (
        <div
            id="graph-container"
            style={{
                width:800,
                height:1000,
            }}
        ></div>
    );
};

export default React.memo(GraphVizLayout, needUpdate);
