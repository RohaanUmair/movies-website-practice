'use client';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import MovieListPoster from './MovieListPoster';
import Image from 'next/image';
import { TbPlayerPlayFilled } from 'react-icons/tb';
import { GoPlus } from 'react-icons/go';
import { HiOutlineHandThumbUp } from 'react-icons/hi2';
import { LiaVolumeOffSolid } from 'react-icons/lia';
import { AppDispatch, RootState } from '@/states/store';
import { useDispatch, useSelector } from 'react-redux';
import { addLikedMovie, MovieData } from '@/states/movies/moviesSlice';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


function MoviesList({ title, numOfMovies, setShowModal, setModalDetails }: {
    title: string, numOfMovies: number, setShowModal: Dispatch<SetStateAction<boolean>>, setModalDetails: Dispatch<SetStateAction<{
        movieName: string;
        movieDesc: string;
    }>>;
}) {
    const [hoveredMovieTitle, setHoveredMovieTitle] = useState<string>('');

    let movies: MovieData[] = useSelector((state: RootState) => state.movies.apiData);
    movies = movies.slice(0, numOfMovies);

    const dispatch = useDispatch<AppDispatch>();

    const likedMoviesArr = useSelector((state: RootState) => state.movies.likedMovies);

    const email = useSelector((state: RootState) => state.user.userEmail)

    const handleLikeMovie = async (title: string) => {
        dispatch(addLikedMovie(title));
        toast.success('Saved to Liked Movies');
        console.log(likedMoviesArr);
        setHoveredMovieTitle('');
    }

    const accType = useSelector((state: RootState) => state.user.userAccType);

    async function abcd() {
        await axios.put('/api/like-movie', { email, accType, likedMoviesArr })
    }

    useEffect(() => {
        abcd();

    }, [likedMoviesArr]);

    return (
        <div className='flex flex-col'>
            <h1 className='text-white font-semibold text-lg mb-2        max-xs:text-base'>{title}</h1>

            <div className='flex gap-2 overflow-x-scroll w-full overflow-visible scrollbar-hide pr-8'>
                {
                    movies.map((movie, index: number) => {
                        return (
                            <div key={index} onMouseLeave={() => setHoveredMovieTitle('')}>
                                <MovieListPoster setHoveredMovieTitle={setHoveredMovieTitle} setModalDetails={setModalDetails} movieName={movie.title} movieImg={movie.backdrop_path} setShowModal={setShowModal} movieDesc={movie.overview} key={movie.title} />
                                {movie.title == hoveredMovieTitle && (
                                    <div style={{ boxShadow: '2px 2px 6px 3px #111' }} className='rounded overflow-hidden w-80 flex flex-col absolute -top-52 z-50'>
                                        <Image
                                            alt='bg'
                                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                            width={1600}
                                            height={900}
                                            className='w-full h-40 object-cover'
                                        />

                                        <div className='w-12 h-12 border rounded-full flex absolute bottom-36 right-3      max-md:w-9 max-md:h-9' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                                            <LiaVolumeOffSolid className='m-auto text-3xl text-white       max-md:text-2xl' />
                                        </div>

                                        <div className='w-full h-full bg-zinc-900 p-4'>

                                            <div className='flex gap-2 mb-3'>
                                                <button className='text-xl font-bold h-10 rounded-full w-10 gap-1 justify-center flex items-center bg-white text-black'>
                                                    <TbPlayerPlayFilled />
                                                </button>

                                                <div className='border rounded-full w-10 h-10 flex cursor-pointer justify-center items-center text-white bg-zinc-800 text-3xl'>
                                                    <GoPlus />
                                                </div>

                                                <div
                                                    className='border rounded-full w-10 h-10 flex cursor-pointer justify-center items-center text-white bg-zinc-800 text-[22px]'
                                                    onClick={() => {
                                                        handleLikeMovie(movie.title)
                                                    }}
                                                >
                                                    <HiOutlineHandThumbUp />
                                                </div>
                                            </div>


                                            <div className='flex flex-col gap-3'>
                                                <div className='flex gap-2'>
                                                    <h6 className='text-[#aaa] text-[11px] border px-2 border-[#777]'>18+</h6>
                                                    <p className='text-[#aaa] text-sm font-semibold'>2h 41m</p>
                                                </div>
                                                <p className='text-[11px] font-semibold text-[#aaa]'>romance, language, suggestive content</p>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        )
                    })
                }
            </div>

            <Toaster />
        </div>
    );
}

export default MoviesList;