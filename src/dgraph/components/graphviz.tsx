import React, { FC, useEffect } from 'react';
import G6, {
    Graph,
    IG6GraphEvent,
    IGraph,
    IGroup,
    Item,
    ModelConfig,
    UpdateType,
    IShape,
} from '@antv/g6';

import { DotParser } from '../dotParser';
import { dotExampleString } from '../data/dot';
import { LineInfo } from '../types';
import { getEllipsisText, measureTextWidth } from '@antv/util';

const dotParser = new DotParser(dotExampleString);

export interface DGraphProps {
    width: number;
    height: number;
    type: string;
}

G6.registerNode(
    'Basic-Block-node',
    {
        draw(cfg: ModelConfig, group: IGroup) {
            const { instLines, style } = cfg;
            const width: number = cfg.width as number;
            const height = cfg.height as number;
            const boxStyle = {
                stroke: '#096DD9',
                radius: 4,
            };

            let startHeight = -height / 2;
            const headGroup = group.addGroup({});

            headGroup.addShape('rect', {
                attrs: {
                    x: -width / 2,
                    y: startHeight,
                    width,
                    height: 22,
                    stroke: boxStyle.stroke,
                    radius: [boxStyle.radius, boxStyle.radius, 0, 0],
                },
                name: 'head-group',
                // draggable: true,
            });
            startHeight += 22;
            headGroup.addShape('text', {
                attrs: {
                    x: 0, // 居中
                    y: -height / 2 + 11,
                    textAlign: 'center',
                    textBaseline: 'middle',
                    text: cfg.label,
                    fill: '#212121',
                },
                name: 'head-label',
            });
            const keyShape = group.addShape('rect', {
                attrs: {
                    x: -width / 2,
                    y: -height / 2,
                    width,
                    height,
                    fillOpacity: 0.2,
                    ...boxStyle,
                },
                name: 'node-box',
            });

            const instLineList = instLines as LineInfo[];
            const lineHeight = style.instLineHeight || 12;
            const paddingV = style.paddingV || 8;
            const breakpointRx = style.breakPointR || 3;
            const paddingH = style.paddingH || 6;
            const instFontSize = style.instFontSize || 10;
            startHeight += paddingV;
            if (instLineList.length > 0) {
                const instGroup = group.addGroup({ name: 'inst-group' });
                for (let i = 0; i < instLineList.length; i++) {
                    const lineGroup = instGroup.addGroup({
                        name: 'inst-line-group',
                    });
                    const lineInfo = instLineList[i];
                    lineGroup.cfg.lineInfo = lineInfo;
                    lineGroup.cfg.lineIndex = i;

                    let lineLeft = -width / 2 + paddingH;

                    const lineStartHeight =
                        startHeight + i * (lineHeight + paddingV);
                 
                    lineGroup.addShape('circle', {
                        attrs: {
                            x: lineLeft + breakpointRx,
                            y:
                                lineStartHeight +
                                // lineHeight / 2 +
                                // paddingV -
                                breakpointRx,
                            r: breakpointRx,
                            fillOpacity: lineInfo.showBreakPoint ? 1 : 0,
                            fill: 'red',
                        },
                        name: `break-point`,
                    });

                    lineLeft += breakpointRx * 2 + paddingH;
                    lineGroup.addShape('text', {
                        attrs: {
                            fontSize: instFontSize,
                            fill: '#616161',
                            x: lineLeft,
                            y: lineStartHeight,
                            textAlign: 'start',
                            textBaseline: 'top',
                            text: lineInfo.pc,
                        },
                    });

                    lineLeft +=
                        measureTextWidth(lineInfo.pc, instFontSize) + paddingH;

                    const restWidth = width - lineLeft - paddingH;
                    lineGroup.addShape('text', {
                        attrs: {
                            fontSize: instFontSize,
                            x: lineLeft,
                            y: lineStartHeight,
                            width: restWidth,
                            textAlign: 'start',
                            textBaseline: 'top',
                            fill: '#919191',
                            text: getEllipsisText(
                                lineInfo.opStr,
                                restWidth,
                                instFontSize
                            ),
                        },
                    });
                }
            }

            return keyShape;
        },
        update(cfg: ModelConfig, node: Item, updateType: UpdateType) {
            console.log(cfg, node, updateType);
            const lineIndex = cfg.lineIndex as number;
            const instLines = cfg.instLines as LineInfo[];
            const lineInfo = instLines[lineIndex];

            const group = node.getContainer(); // 获取容器
            const instGroup = group.find(
                (e) => e.get('name') === 'inst-group'
            ) as IGroup;

            const instLineGroup = instGroup.getChildren()[lineIndex] as IGroup;
            const breakPointShape = instLineGroup.get('children')[0] ;
            console.log(
                group,
                instGroup,
                lineIndex,
                instLineGroup,
                breakPointShape
            );
            breakPointShape.attr({
                fillOpacity: lineInfo.showBreakPoint ? 1 : 0,
            });
            console.log(breakPointShape);
        },
        getAnchorPoints() {
            return [
                [0.5, 0],
                [0.5, 1],
            ];
        },
        getPath(cfg: ModelConfig) {
            const size = cfg.size as [number, number];
            const width = size[0];
            const height = size[1];
            return [
                ['M', 0, 0 - height / 2], // 上部顶点
                ['L', width / 2, 0], // 右侧顶点
                ['L', 0, height / 2], // 下部顶点
                ['L', -width / 2, 0], // 左侧顶点
                ['Z'], // 封闭
            ];
        },
    },
    'single-node'
);

G6.registerEdge('Bezier-path', {
    draw(cfg, group) {
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;
        const positions = cfg.positions as [number, number][];
        let path = `M ${startPoint.x},${startPoint.y} C`;
        for (let i = 1; i < positions.length - 1; i++) {
            path += `${positions[i][0]},${positions[i][1]} `;
        }
        path += `${endPoint.x},${endPoint.y} `;
        const shape = group.addShape('path', {
            attrs: {
                path: path,
                stroke: 'steelblue',
                linewidth: 3,
                endArrow: {
                    // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
                    path: 'M 0,0 L 8,4 L 8,-4 Z',
                    // 箭头的偏移量，负值代表向 x 轴正方向移动
                    // d: -10,
                    // v3.4.1 后支持各样式属性
                    fill: '#333',
                    stroke: '#666',
                    opacity: 0.8,
                    // ...
                },
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: 'path-shape',
        });
        return shape;
    },
});

const GraphVizLayout: FC<DGraphProps> = (props: DGraphProps) => {
    const { type } = props;
    useEffect(() => {
        dotParser.parse().then((data) => {
            const { width, height, edges, combos, nodes } = data;

            const graph = new Graph({
                container: 'container',
                width,
                height,
                groupByTypes: false,
                fitView: true,
                fitViewPadding: [8, 8],
                defaultNode: {
                    type: 'Basic-Block-node',
                    anchorPoints: [
                        [0.5, 0],
                        [0.5, 1],
                    ],
                },
                layout: {
                    preventOverlap: true,
                    workerEnabled: true,
                },
                defaultCombo: {
                    type: 'rect',
                    labelCfg: {
                        position: 'top',
                    },
                    style: {
                        radius: 4,
                    },
                },
                // renderer: 'svg',
                modes: {
                    default: ['drag-canvas', 'zoom-canvas'],
                },

                defaultEdge: {
                    type: 'Bezier-path',
                    style: {
                        stroke: '#000',
                        endArrow: true,
                    },
                },
            });
            graph.on('node:click', (e: IG6GraphEvent) => {
                const { item, shape } = e;
                const group = shape.getParent();
                const graph = e.currentTarget as IGraph;

                if (group?.cfg?.lineInfo) {
                    const lineInfo = group?.cfg?.lineInfo as LineInfo;
                    const lineIndex = group?.cfg?.lineIndex;
                    lineInfo.showBreakPoint = !lineInfo.showBreakPoint;
                    graph.updateItem(item, {
                        lineIndex,
                    });
                }
            });
            graph.data({ nodes, edges, combos });
            graph.render();
        });
    }, []);

    return <div id="container"></div>;
};

export default GraphVizLayout;
