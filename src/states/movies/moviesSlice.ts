import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MovieData {
    backdrop_path: string;
    overview: string;
    poster_path: string;
    title: string;
}

interface MovieState {
    apiData: MovieData[];
    likedMovies: string[];
    disLikedMovies: string[];
    watchlistMovies: string[];
}

const initialState: MovieState = {
    apiData: [],
    likedMovies: [],
    disLikedMovies: [],
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
        setDislikedMovies: (state, action: PayloadAction<string[]>) => {
            state.disLikedMovies = action.payload;
        },
        setWatchlistMovies: (state, action: PayloadAction<string[]>) => {
            state.watchlistMovies = action.payload;
        },
        addLikedMovie: (state, action: PayloadAction<string>) => {
            state.likedMovies.push(action.payload);
        },
        addDislikedMovie: (state, action: PayloadAction<string>) => {
            state.disLikedMovies.push(action.payload);
        },
        addWatchlistedMovie: (state, action: PayloadAction<string>) => {
            state.watchlistMovies.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action: PayloadAction<MovieData[]>) => {
            state.apiData = action.payload;
        });
    }
});


export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async (_, { rejectWithValue }) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJjMDM5N2MyN2RkYjJmM2U4ODI4N2U1NTU5NTUyMSIsIm5iZiI6MTczODU4MDE1MC43OTAwMDAyLCJzdWIiOiI2N2EwYTBiNmU5OWRmMjNhOWYyNjc1MjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dG7wxvB4UCX128gdM4dJ6eO84r0DNYe0jzuk3orNCvQ'
            }
        };

        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
            const data = await response.json();
            return data.results as MovieData[];
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);



export const { setApiData, setLikedMovies, setDislikedMovies, setWatchlistMovies, addLikedMovie, addDislikedMovie, addWatchlistedMovie } = moviesSlice.actions;

export default moviesSlice.reducer;