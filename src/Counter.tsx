import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    decremented,
    incremented,
    incrementByAmount,
    incrementAsync,
    selectCount,
} from './store/counter';

import './counter.css';
export function Counter() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    return (
        <div className='counter'>
            <div className='counrte'>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(incremented())}
                >
                    +
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decremented())}
                >
                    -
                </button>
            </div>
        </div>
    );
}
