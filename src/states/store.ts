import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from './movies/moviesSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;