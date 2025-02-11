"use client";
import { fetchMovies } from "@/states/movies/moviesSlice";
import { AppDispatch, store } from "@/states/store";
import { fetchUserData } from "@/states/user/userSlice";
import React, { ReactNode, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import Cookies from "js-cookie";

function Providers({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <InitData />
            {children}
        </Provider>
    );
}

function InitData() {
    const dispatch = useDispatch<AppDispatch>();
    const user = Cookies.get("user");

    useEffect(() => {
        if (user) {
            dispatch(fetchUserData());
            dispatch(fetchMovies());
        }
    }, [dispatch, user]);

    return null;
}

export default Providers;
