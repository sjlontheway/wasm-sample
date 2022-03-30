import { ComboConfig, EdgeConfig, NodeConfig, ShapeStyle } from '@antv/g6';

export interface Box {
    startX: number;
    startY: number;
    width: number;
    height: number;
}

export interface InstLine {
    pc: string;
    opStr: string;
}

export type LineInfo = InstLine & {
    showBreakPoint: boolean;
    onClick?: any;
};

export type FlowGraphProps = {
    width?: number;
    height?: number;
    onInstLineClick?: (liniInfo: LineInfo, index: number) => void;
    showInstContextMenu?: [];
    nodes?: NodeConfig[];
    edges?: EdgeConfig[];
    combos?: ComboConfig[];
    style?: ShapeStyle;
};
