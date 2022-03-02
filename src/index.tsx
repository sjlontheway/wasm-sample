import React from 'react';
import { render } from 'react-dom';
import { graphvizVersion } from '@hpcc-js/wasm';
import FlowGraph from './dgraph'

graphvizVersion().then((v) => console.log(v));
const HelloWorld = () => {
    return <FlowGraph  />;
};
render(<HelloWorld />, document.getElementById('root'));
