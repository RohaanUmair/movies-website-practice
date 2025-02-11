import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


interface UserState {
    username: string;
    userAccType: string | null;
    userEmail: string | null;
    accNames: string[];
    accAvatars: { accName: string, avatar: number | null }[];
}

const initialState: UserState = {
    username: '',
    userAccType: null,
    userEmail: null,
    accNames: [],
    accAvatars: []
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
        },
        setAccAvatars: (state, action: PayloadAction<{ accName: string; avatar: number | null }[]>) => {
            state.accAvatars = action.payload;
        }
    }
});


export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (_, { dispatch }) => {
        const username = Cookies.get('user') || '';
        const userEmail = Cookies.get('userEmail') || null;
        const userAccType = Cookies.get('accType') || null;
        const accNames = Cookies.get('accNames')?.split(',');
        const accAvatars = JSON.parse(Cookies.get('accAvatars'));


        dispatch(setUsername(username));
        dispatch(setUserEmail(userEmail));
        dispatch(setUserAccType(userAccType));
        dispatch(setAccNames(accNames));
        dispatch(setAccAvatars(accAvatars));
    }
);

export const { setUsername, setUserAccType, setUserEmail, setAccNames, addAccName, setAccAvatars } = userSlice.actions;

export default userSlice.reducer;