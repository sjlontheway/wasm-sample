import G6, { ModelConfig, IGroup, Item, UpdateType, Shape } from '@antv/g6';
import { getEllipsisText, measureTextWidth } from '@antv/util';
import { ShapeAttrs } from '@antv/g-base';
import { LineInfo } from '../types';

const type = 'Basic-Block-node';

const NodeStyle = {
    boxStyle: {
        stroke: '#096DD9',
        radius: 4,
        fill: '#fafafa',
    },
    headStyle: {
        fill: '#096DD9',
        height: 22,
        radius: [4, 4, 0, 0],
        labelStyle: {
            fontSize: 12,
            fill: '#fff',
        },
    },

    instGroupStyle: {
        paddingV: 8,
        paddingH: 6,
        lineHeight: 10,
        fontSize: 10,
        breakPointStyle: {
            r: 3,
            fill: 'red',
            padding: 6,
            lineHeiht: 12,
        },
        labelPcStyle: {
            fontSize: 10,
            padding: 3,
            lineHeiht: 12,
            textAlign: 'start',
            textBaseline: 'top',
            fill: '#616161',
        },
        labelOpStrStyle: {
            fontSize: 10,
            padding: 3,
            lineHeiht: 12,
            textAlign: 'start',
            textBaseline: 'top',
            fill: '#919191',
        },
    },
};

G6.registerNode(
    type,
    {
        draw(cfg: ModelConfig, group: IGroup) {
            const { instLines, style } = cfg;
            const width: number = cfg.width as number;
            const height = cfg.height as number;

            let startHeight = -height / 2;
            let startWidth = -width / 2;

            const keyShape = group.addShape('rect', {
                attrs: {
                    x: -width / 2,
                    y: -height / 2,
                    width,
                    height,
                    ...NodeStyle.boxStyle,
                },
                name: 'node-box',
            });
            const headGroup = group.addGroup({});

            headGroup.addShape('rect', {
                attrs: {
                    x: startWidth,
                    y: startHeight,
                    width,
                    ...NodeStyle.headStyle,
                },
                name: 'head-group',
            });
            headGroup.addShape('text', {
                attrs: {
                    x: 0, // 居中
                    y: -height / 2 + NodeStyle?.headStyle?.height / 2,
                    textAlign: 'center',
                    textBaseline: 'middle',
                    text: cfg.label,
                    ...NodeStyle.headStyle.labelStyle,
                },
                name: 'head-label',
            });
            startHeight += NodeStyle.headStyle.height;

            const instLineList = instLines as LineInfo[];

            if (instLineList.length > 0) {
                const instGroup = group.addGroup({ name: 'inst-group' });
                const {
                    breakPointStyle,
                    labelPcStyle,
                    labelOpStrStyle,
                    paddingH,
                    paddingV,
                    lineHeight,
                    fontSize,
                } = NodeStyle.instGroupStyle;
                startHeight += paddingV;
                for (let i = 0; i < instLineList.length; i++) {
                    const lineGroup = instGroup.addGroup({
                        name: 'inst-line-group',
                    });
                    startWidth = -width / 2 + paddingH;
                    const lineInfo = instLineList[i];
                    lineGroup.cfg.lineInfo = lineInfo;
                    lineGroup.cfg.lineIndex = i;

                    const lineStartHeight =
                        startHeight + i * (lineHeight + paddingV);

                    lineGroup.addShape('circle', {
                        attrs: {
                            x: startWidth + breakPointStyle.r,
                            y: lineStartHeight + breakPointStyle.r,
                            ...breakPointStyle,
                            fillOpacity: lineInfo.showBreakPoint ? 1 : 0,
                        },

                        name: `break-point`,
                    });

                    startWidth += breakPointStyle.r * 2 + paddingH;
                    lineGroup.addShape('text', {
                        attrs: {
                            x: startWidth,
                            y: lineStartHeight,
                            text: lineInfo.pc,
                            ...labelPcStyle as ShapeAttrs,
                        },
                    });

                    startWidth +=
                        measureTextWidth(lineInfo.pc, { fontSize }) + paddingH;
                    const restWidth = width - startWidth - paddingH;
                    lineGroup.addShape('text', {
                        attrs: {
                            x: startWidth,
                            y: lineStartHeight,
                            width: restWidth,
                            text: getEllipsisText(lineInfo.opStr, restWidth, {
                                fontSize,
                            }),
                            ...labelOpStrStyle as ShapeAttrs,
                        },
                    });
                }
            }

            return keyShape;
        },
        update(cfg: ModelConfig, node: Item, updateType: UpdateType) {
            const lineIndex = cfg.lineIndex as number;
            const instLines = cfg.instLines as LineInfo[];
            const lineInfo = instLines[lineIndex];

            const group = node.getContainer(); // 获取容器
            const instGroup = group.find(
                (e) => e.get('name') === 'inst-group'
            ) as IGroup;

            const instLineGroup = instGroup.getChildren()[lineIndex] as IGroup;
            const breakPointShape = instLineGroup.get('children')[0];

            breakPointShape.attr({
                fillOpacity: lineInfo.showBreakPoint ? 1 : 0,
            });
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

export default type;
