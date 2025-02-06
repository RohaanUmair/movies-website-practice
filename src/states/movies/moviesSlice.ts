import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MovieData {
    backdrop_path: string;
    overview: string;
    poster_path: string;
    title: string;
}

interface MovieState {
    apiData: MovieData[];
    likedMovies: string[];
    watchlistMovies: string[];
}

const initialState: MovieState = {
    apiData: [],
    likedMovies: [],
    watchlistMovies: []
}

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setApiData: (state, action: PayloadAction<MovieData[]>) => {
            state.apiData = action.payload;
        },
        setLikedMovies: (state, action: PayloadAction<string[]>) => {
            state.likedMovies = action.payload;
        },
        setWatchlistMovies: (state, action: PayloadAction<string[]>) => {
            state.watchlistMovies = action.payload;
        },
        addLikedMovie: (state, action: PayloadAction<string>) => {
            state.likedMovies.push(action.payload);
        },
        addWatchlistedMovie: (state, action: PayloadAction<string>) => {
            state.watchlistMovies.push(action.payload);
        }
    }
});


export const { setApiData, setLikedMovies, setWatchlistMovies, addLikedMovie, addWatchlistedMovie } = moviesSlice.actions;

export default moviesSlice.reducer;