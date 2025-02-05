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
}

function NumberedMovieListPoster({ setShowModal, movieName, movieImg, setModalDetails, movieDesc }: Props) {
    return (
        <div>
            <div className="w-32 h-40 bg-cover bg-center rounded flex-shrink-0 relative cursor-pointer" onClick={() => {
                setShowModal(true);
                setModalDetails({
                    movieName,
                    movieDesc
                });
            }}
            >
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movieImg}`}
                    alt={movieName}
                    layout='omit'
                    height={112}
                    width={192}
                    className="rounded object-cover w-full h-full"
                />
            </div>
        </div>
    );
}

export default NumberedMovieListPoster;
