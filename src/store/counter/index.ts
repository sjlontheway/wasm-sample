import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '..';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        incremented: (state) => {
            state.value += 1;
        },
        decremented: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const incrementAsync = (amount: number) => (dispatch: AppDispatch) => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount));
    }, 1000);
};

export const selectCount = (state: RootState) => state.value;

export const { incremented, decremented, incrementByAmount } =
    counterSlice.actions;

export default counterSlice;
