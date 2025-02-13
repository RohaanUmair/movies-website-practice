"use client";
import { fetchMovies } from "@/states/movies/moviesSlice";
import { AppDispatch, store } from "@/states/store";
import { fetchUserData } from "@/states/user/userSlice";
import React, { ReactNode, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import Footer from "../login-page/Footer";

function Providers({ children }: { children: ReactNode }) {
    const accType = Cookies.get('accType');

    return (
        <Provider store={store}>
            <InitData />
            {children}
            {accType && (
                <div className="bg-black px-40    max-lg:px-0">
                    <Footer />
                </div>
            )}
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
