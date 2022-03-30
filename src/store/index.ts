import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counter';

const store = configureStore({
    reducer: counterSlice.reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


export default store;

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()));
