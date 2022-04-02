import React from 'react';
import { render } from 'react-dom';
import { graphvizVersion } from '@hpcc-js/wasm';
import FlowGraph from './dgraph';
import store from './store';
import { Provider } from 'react-redux';
import { Counter } from './Counter';
import VirtualMemory from './virtualmemory/VirtualMemoryMap';
graphvizVersion().then((v) => console.log(v));

const worker = new Worker(new URL('./worker/worker_canvas.ts', import.meta.url))
worker.postMessage({
  question:
    'The Answer to the Ultimate Question of Life, The Universe, and Everything.',
})
worker.onmessage = ({ data: { answer } }) => {
  console.log(answer)
}
import CavasList from './canvasList/CavasList'


render(
    <Provider store={store}>
        {/* <Counter /> */}
        {/* <FlowGraph /> */}
        {/* <VirtualMemory width={100} height={1000} /> */}
        <CavasList width={1000} height={300}/>
    </Provider>,
    document.getElementById('root')
);
