import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        addValue: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    }
});

export const { increment, decrement, addValue } = counterSlice.actions;
export default counterSlice.reducer;