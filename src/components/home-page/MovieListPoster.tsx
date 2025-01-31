import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

function MovieListPoster({ setShowModal }: { setShowModal: Dispatch<SetStateAction<boolean>> }) {
    const num = Math.ceil(Math.random() * 8);

    return (
        <div>
            <div className="w-48 h-28 bg-cover bg-center rounded flex-shrink-0 relative cursor-pointer" onClick={() => setShowModal(true)}>
                <Image
                    src={`/movie-poster${num}.jpg`}
                    alt="Movie Poster"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded"
                />
            </div>
        </div>
    );
}

export default MovieListPoster;
