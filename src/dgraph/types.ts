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
