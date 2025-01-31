import React, { Dispatch, SetStateAction } from 'react'
import MovieListPoster from './MovieListPoster';

function MoviesList({ title, numOfMovies, setShowModal }: { title: string, numOfMovies: number, setShowModal: Dispatch<SetStateAction<boolean>> }) {
    const a = [];
    for (let i = 0; i < numOfMovies; i++) {
        a.push(1);
    }

    return (
        <div className='flex flex-col'>
            <h1 className='text-white font-semibold text-lg mb-2'>{title}</h1>

            <div className='flex gap-2 overflow-x-scroll w-full scrollbar-hide pr-8'>
                {
                    a.map((movie, index) => <MovieListPoster setShowModal={setShowModal} key={index} />)
                }
            </div>
        </div>
    );
}

export default MoviesList;