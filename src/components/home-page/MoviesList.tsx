import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import MovieListPoster from './MovieListPoster';

function MoviesList({ title, numOfMovies, setShowModal, apiData, setModalDetails }: {
    title: string, numOfMovies: number, setShowModal: Dispatch<SetStateAction<boolean>>, apiData: any, setModalDetails: Dispatch<SetStateAction<{
        movieName: string;
        movieDesc: string;
    }>>;
}) {
    const a = [];
    for (let i = 0; i < numOfMovies; i++) {
        a.push(1);
    }

    return (
        <div className='flex flex-col'>
            <h1 className='text-white font-semibold text-lg mb-2        max-xs:text-base'>{title}</h1>

            <div className='flex gap-2 overflow-x-scroll w-full scrollbar-hide pr-8'>
                {
                    apiData.map((movie: any) => {
                        return (
                            <MovieListPoster setModalDetails={setModalDetails} movieName={movie.title} movieImg={movie.backdrop_path} setShowModal={setShowModal} movieDesc={movie.overview} key={movie.title} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default MoviesList;