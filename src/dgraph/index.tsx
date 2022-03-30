import React, { useEffect, useState } from 'react';
import GraphVizLayout from './components/graphviz';
import { DotParser } from '../lib/dotParser';

import { dotExampleString } from './data/dot';
import { FlowGraphProps, LineInfo } from './types';
const dotParser = new DotParser(dotExampleString);

const FlowGraph = () => {
    const [data, setData] = useState<Partial<FlowGraphProps> | undefined>();
    const [count, setCount] = useState(0);
    const onAddBreakPoint = (lineInfo: LineInfo, index: number) => {
        console.log(count, lineInfo);
        setCount((count) => count + 1);
    };
    useEffect(() => {
        dotParser.parse().then((data) => {
            setData(data);
        });
    }, []);

    return (
        <div>
            <p>流图Example</p>
            <p>操作断点次数: {count}</p>
            {data && (
                <GraphVizLayout {...data} onInstLineClick={onAddBreakPoint} />
            )}
        </div>
    );
};

export default FlowGraph;
