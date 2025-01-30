import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
    loading: boolean;
}


const initialState: CounterState = {
    value: 0,
    loading: false
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        reset: (state) => {
            state.value = 0;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setNumberAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(setNumberAsync.fulfilled, (state, action: PayloadAction<number>) => {
                state.value = action.payload;
                state.loading = false;
            });
    }
});


export const setNumberAsync = createAsyncThunk(
    "counter/setNumberAsync",
    async (amount: number) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Done')
        return amount;
    }
);

export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;