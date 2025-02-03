'use client';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';


interface Props {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    movieName: string;
    movieImg: string;
}

function MovieListPoster({ setShowModal, movieName, movieImg }: Props) {
    // const num = Math.ceil(Math.random() * 8);

    return (
        <div>
            <div className="w-48 h-28 bg-cover bg-center rounded flex-shrink-0 relative cursor-pointer      max-xs:w-44 max-xs:h-[104px]" onClick={() => setShowModal(true)}>
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movieImg}`}
                    alt={movieName}
                    layout='omit'
                    height={112}
                    width={192}
                    className="rounded object-cover object-center"
                />
                <h1 className='absolute z-50 bottom-1 left-0 font-semibold text-white w-full' style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>{movieName}</h1>
            </div>
        </div>
    );
}

export default MovieListPoster;
