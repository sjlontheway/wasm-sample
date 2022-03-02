import { NodeConfig, EdgeConfig, ComboConfig, IPointTuple } from '@antv/g6';
import { graphviz } from '@hpcc-js/wasm';
import { dotExampleString } from './data/dot';
import { Box, InstLine } from './types';
import { getCustomColor } from '../utils/x11Color';

export async function parseDotStringToJson(
    dotString: string = dotExampleString
) {
    const ret = await graphviz.layout(dotString, 'json');
    return JSON.parse(ret);
}

export class DotParser {
    private orignalObject: Object;
    private nodes: NodeConfig[] = [];
    private edges: EdgeConfig[] = [];
    private combos: ComboConfig[] = [];
    private graphWidth: number;
    private graphHeight: number;
    private graphName: string;

    constructor(private dotString: string) {}

    async covertDotToJson() {
        const ret: string = await graphviz.layout(this.dotString, 'json');
        this.orignalObject = JSON.parse(ret);
        console.log(this.orignalObject);
        return this;
    }

    async parse() {
        if (!this.orignalObject) {
            await this.covertDotToJson();
        }
        const { name, bb, edges, objects } = this.orignalObject as any;
        this.graphName = name;
        const graphBox = this._parseBBoxStr(bb);
        this.graphWidth = graphBox.width;
        this.graphHeight = graphBox.height;
        this.parseEdges(edges);
        this.parseNodeAndCombos(objects);
        return {
            nodes: this.nodes,
            edges: this.edges,
            combos: this.combos,
            name: this.graphName,
            width: this.graphWidth,
            height: this.graphHeight,
        };
    }

    _parseBBoxStr(str: string): Box {
        const rect = str.split(',')?.map((v) => parseFloat(v)) as [
            number,
            number,
            number,
            number
        ];

        const startX = rect[0];
        const startY = this.graphHeight - rect[3];

        return {
            startX,
            startY,
            width: rect[2] - rect[0],
            height: rect[3] - rect[1],
        };
    }

    parseEdges(edges: object) {
        const orignalEdgeDatas = edges as object[];
        for (let i = 0; i < orignalEdgeDatas.length; i++) {
            const orignalEdge = orignalEdgeDatas[i];
            const {
                _gvid: id,
                tail: source,
                head: target,
                _draw_: drawData,
            } = orignalEdge as any;

            const drawPointItem = (drawData as Array<any>).find(
                (d: any) => d.op === 'b'
            );
            const positions = drawPointItem.points.map((p: number[]) => [
                p[0],
                this.graphHeight - p[1],
            ]);
            const edge: EdgeConfig = {
                id: `edge-${id.toString()}`,
                source: source.toString(),
                target: target.toString(),
                positions,
            };
            this.edges.push(edge);
        }
    }

    parseNodeAndCombos(objects: object) {
        const orignalDatas = objects as object[];
        const childIdMapParent = new Map<string, string>();

        for (let obj of orignalDatas) {
            const {
                name,
                _ldraw_: textDrawList,
                _gvid: id,
                subgraphs,
                bgcolor,
                bb,
                nodes,
            } = obj as any;

            if ((name as string).indexOf('cluster') !== -1) {
                this.createCombo(id, textDrawList, bb, bgcolor);
                subgraphs?.forEach((cId: number) => {
                    childIdMapParent.set(cId.toString(), id.toString());
                });
                nodes?.forEach((cId: number) => {
                    childIdMapParent.set(cId.toString(), id.toString());
                });
            } else {
                this.createNode(id, textDrawList, bb);
            }
        }
        this.combos.forEach((c) => {
            const parentId = childIdMapParent.get(c.id);
            if (parentId) {
                c.parentId = parentId;
            }
        });
        this.nodes.forEach((n) => {
            const comboId = childIdMapParent.get(n.id);
            if (comboId) {
                n.comboId = comboId;
            }
        });
    }

    createCombo(id: number, textDrawList: any[], bb: string, bgcolor: string) {
        const box = this._parseBBoxStr(bb);
        const labelObj = textDrawList.find((o) => o.op === 'T');
        const combo: ComboConfig = {
            id: `${id}`,
            label: labelObj?.text,
            style: {
                width: box.width,
                height: box.height,
                fill: getCustomColor(id),
            },
        };

        this.combos.push(combo);
    }

    filterDrawObject(textDrawList: any[], op: string) {
        return textDrawList?.filter((o) => o.op === op);
    }

    parseNodePosition(drawList: any[]) {
        const rectObjList = this.filterDrawObject(drawList, 'p');

        let width, height, x, y;
        const startPRectPoint = rectObjList[0].points;
        x = startPRectPoint[1][0];
        y = startPRectPoint[1][1];

        const endPoint = rectObjList[rectObjList.length - 1].points;
        width = endPoint[3][0] - x;
        height = y - endPoint[3][1];
        return {
            x,
            y,
            width,
            height,
        };
    }

    createNode(id: number, drawList: any[], bb: string) {
        const textObjList: any[] = this.filterDrawObject(drawList, 'T');

        const { x, y, width, height } = this.parseNodePosition(drawList);
        if (!textObjList || (textObjList.length & 1) !== 1) {
            // 长度为奇数
            throw new Error('parse data error');
        }

        const label = textObjList[0].text;
        const instLines: InstLine[] = [];
        for (let i = 1; i < textObjList.length - 1; i += 2) {
            const instLine = {
                pc: textObjList[i].text,
                opStr: textObjList[i + 1].text,
            };
            instLines.push(instLine);
        }

        const node: NodeConfig = {
            id: `${id}`,
            label,
            x: x + width / 2,
            y: this.graphHeight - y + height / 2,
            width,
            height,
            instLines,
        };
        this.nodes.push(node);
    }
}
