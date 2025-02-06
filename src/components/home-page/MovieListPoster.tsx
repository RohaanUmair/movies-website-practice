'use client';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';


interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    movieName: string;
    movieImg: string;
    movieDesc: string
    setModalDetails: Dispatch<SetStateAction<{
        movieName: string;
        movieDesc: string;
    }>>;
    setHoveredMovieTitle: Dispatch<SetStateAction<string>>
}

function MovieListPoster({ setShowModal, movieName, movieImg, setModalDetails, movieDesc, setHoveredMovieTitle }: Props) {
    return (
        <div>
            <div
                className="w-48 h-28 bg-cover bg-center cursor-pointer rounded flex-shrink-0 relative      max-xs:w-44 max-xs:h-[104px]"
                onClick={() => {
                    setShowModal(true);
                    setModalDetails({
                        movieName,
                        movieDesc
                    });
                }}
                onMouseEnter={() => {
                    setHoveredMovieTitle(movieName);
                }}
            >
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movieImg}`}
                    alt={movieName}
                    layout='omit'
                    height={112}
                    width={192}
                    className="rounded object-cover"
                />
                <h1 className='absolute z-50 bottom-1 left-0 font-semibold text-white w-full' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{movieName}</h1>
            </div>
        </div>
    );
}

export default MovieListPoster;
