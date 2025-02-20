import React, { Dispatch, SetStateAction } from 'react'
import NumberedMovieListPoster from './NumberedMovieListPoster';

function NumberedMovieList({ title, numOfMovies, setShowModal, apiData, setModalDetails }: {
    title: string, numOfMovies: number, setShowModal: Dispatch<SetStateAction<boolean>>, apiData: any, setModalDetails: Dispatch<SetStateAction<{
        movieName: string;
        movieDesc: string;
    }>>;
}) {
    const a: Array<number> = [];
    for (let i = 0; i < numOfMovies; i++) {
        a.push(1);
    }

    console.log(apiData)

    return (
        <div className='flex flex-col'>
            <h1 id='numbered-movie-list-heading' className='text-white font-semibold text-lg mb-2        max-xs:text-base'>{title}</h1>

            <div className='flex gap-2 overflow-x-scroll w-full scrollbar-hide pr-8'>
                {
                    apiData.map((movie: any, i: number) => {
                        return (
                            <div key={i} className='flex items-center overflow-y-clip relative w-56 shrink-0'>
                                <h1 className='text-[205px] -translate-y-2 font-sans translate-x-7 font-bold leading-none' style={{ textShadow: '2px 0px gray, -2px 0px gray, 0px -2px gray, 0px 2px gray' }}>{i + 1}</h1>
                                <NumberedMovieListPoster setModalDetails={setModalDetails} movieName={movie.title} movieImg={movie.poster_path} setShowModal={setShowModal} movieDesc={movie.overview} key={movie.title} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default NumberedMovieList;