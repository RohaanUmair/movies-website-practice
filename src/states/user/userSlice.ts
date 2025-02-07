import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    username: string;
    userAccType: 'kids' | 'adult' | null;
    userEmail: string | null;
}

const initialState: UserState = {
    username: '',
    userAccType: null,
    userEmail: null
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
        },
        setUserEmail: (state, action: PayloadAction<string | null>) => {
            state.userEmail = action.payload;
        }
    }
})


export const { setUsername, setUserAccType, setUserEmail } = userSlice.actions;

export default userSlice.reducer;