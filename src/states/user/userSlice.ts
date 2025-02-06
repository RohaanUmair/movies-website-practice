import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    username: string;
    userAccType: 'kids' | 'adult' | null;
}

const initialState: UserState = {
    username: '',
    userAccType: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setUserAccType: (state, action: PayloadAction<'kids' | 'adult' | null>) => {
            state.userAccType = action.payload;
        }
    }
})


export const { setUsername, setUserAccType } = userSlice.actions;

export default userSlice.reducer;