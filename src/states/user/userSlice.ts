import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    username: string;
    userAccType: string | null;
    userEmail: string | null;
    accNames: string[];
}

const initialState: UserState = {
    username: '',
    userAccType: null,
    userEmail: null,
    accNames: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setUserAccType: (state, action: PayloadAction<string | null>) => {
            state.userAccType = action.payload;
        },
        setUserEmail: (state, action: PayloadAction<string | null>) => {
            state.userEmail = action.payload;
        },
        setAccNames: (state, action: PayloadAction<string[]>) => {
            state.accNames = action.payload;
        },
        addAccName: (state, action: PayloadAction<string>) => {
            state.accNames.push(action.payload);
        }
    }
})

export const changeAccAsync = createAsyncThunk(
    "changeAccType/changeAccAsync",
    async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
);


export const { setUsername, setUserAccType, setUserEmail, setAccNames } = userSlice.actions;

export default userSlice.reducer;