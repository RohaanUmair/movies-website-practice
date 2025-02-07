'use client';
import NumberedMovieListPoster from '@/components/home-page/NumberedMovieListPoster';
import { MovieData, setApiData, setLikedMovies } from '@/states/movies/moviesSlice';
import { AppDispatch, RootState } from '@/states/store';
import Image from 'next/image'
import React, { useEffect } from 'react'
import { BiSolidHeart } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie'
import axios from 'axios';

export default function LikedMoviesPage() {
    const movies: MovieData[] = useSelector((state: RootState) => state.movies.apiData);

    const likedMoviesNames = useSelector((state: RootState) => state.movies.likedMovies);

    const likedMovies = movies.filter((movie) => likedMoviesNames.includes(movie.title));

    const dispatch = useDispatch<AppDispatch>();

    const email = Cookies.get('userEmail');

    // async function setData() {
    //     const likedMoviesArr = likedMoviesNames;
    //     await axios.put('/api/like-movie', { email, likedMoviesArr })
    // }
    const accType = Cookies.get('accType');


    useEffect(() => {
        if (movies.length == 0) {
            axios.get('/api/like-movie', {
                params: { email, accType }
            })
                .then((data) => {
                    dispatch(setLikedMovies(data.data.data.likedMoviesArr))
                })


            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJjMDM5N2MyN2RkYjJmM2U4ODI4N2U1NTU5NTUyMSIsIm5iZiI6MTczODU4MDE1MC43OTAwMDAyLCJzdWIiOiI2N2EwYTBiNmU5OWRmMjNhOWYyNjc1MjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dG7wxvB4UCX128gdM4dJ6eO84r0DNYe0jzuk3orNCvQ'
                }
            };
            fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
                .then(res => res.json())
                .then(res => dispatch(setApiData(res.results)))
                .catch(err => console.error(err));
        }
    }, [likedMoviesNames]);

    return (
        <div className='px-40 w-full h-screen flex flex-col'>
            <div className='absolute top-0 left-0 w-full h-full z-10'>
                <Image
                    src='/reset-pass-bg.jpg'
                    alt='background'
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                />
            </div>

            <header className='h-24 flex items-center'><h1 className='z-10 text-[#ff0000] text-5xl font-semibold       max-lg:px-[10%] max-md:text-4xl'>Movies</h1></header>

            <div className='w-full h-full text-white z-50 border-t border-[#333] py-4'>
                <h1 className='flex text-4xl font-semibold items-center gap-4'>
                    <BiSolidHeart className='text-rose-600 text-5xl' />
                    Liked Movies
                </h1>

                <div className='flex gap-4 flex-wrap mt-8'>
                    {
                        likedMovies.map((movie, i: number) => {
                            return (
                                <div className='relative' key={i}>
                                    <NumberedMovieListPoster movieName={movie.title} movieDesc={movie.overview} movieImg={movie.backdrop_path} />
                                    <h2 className='absolute bottom-0'>{movie.title}</h2>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}