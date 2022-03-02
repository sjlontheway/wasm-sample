import G6, { ModelConfig, IGroup, Item, UpdateType } from '@antv/g6';
import { getEllipsisText, measureTextWidth } from '@antv/util';
import { LineInfo } from '../types';

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
            const breakPointShape = instLineGroup.get('children')[0];
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


