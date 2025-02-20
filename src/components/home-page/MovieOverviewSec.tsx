import React, { Dispatch, SetStateAction } from 'react'
import { BsDot } from 'react-icons/bs';
import { LiaVolumeOffSolid } from 'react-icons/lia';
import MoviesList from './MoviesList';
import { IoMdPlay } from 'react-icons/io';
import { MdInfoOutline } from 'react-icons/md';
import NumberedMovieList from './NumberedMovieList';
import { useSelector } from 'react-redux';
import { RootState } from '@/states/store';
import { MovieData } from '@/states/movies/moviesSlice';

function MovieOverviewSec({ setShowModal, setModalDetails, setShowVideoPlayer, setPlayerMovieName }: {
    setShowModal: Dispatch<SetStateAction<boolean>>, setModalDetails: Dispatch<SetStateAction<{
        movieName: string;
        movieDesc: string;
    }>>, setShowVideoPlayer: Dispatch<SetStateAction<boolean>>;
    setPlayerMovieName: Dispatch<SetStateAction<string>>;
}) {
    const movies: MovieData[] = useSelector((state: RootState) => state.movies.apiData);

    const accType = useSelector((state: RootState) => state.user.userAccType);

    if (movies.length == 0) {
        return (
            <div className='h-screen w-full bg-black flex justify-center items-center'>
                <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
            </div>
        )
    }

    const vidUrl = accType !== 'kids' ? '/bg-video.mp4' : 'k-bg-video.mp4';

    return (
        <div>
            <video
                id='bg-video'
                src={vidUrl}
                className='absolute h-screen w-full object-cover inset-0 z-10 opacity-75       max-md:h-[60dvh]'
                autoPlay
                loop
                muted
            />

            <div className='z-10 mt-56 ml-14 text-white relative        max-md:mt-24 max-md:ml-8 max-xs:ml-4 max-xs:mt-36'>

                <div className='flex gap-4      max-xs:gap-2'>
                    <div className={`w-28 h-28 rounded-2xl bg-[url("https://image.tmdb.org/t/p/w500${movies[0].backdrop_path}")] bg-cover bg-center         max-md:w-24 max-md:h-24 max-xs:w-20 max-xs:h-20`} style={{ boxShadow: '1px 1px 25px 2px #111' }}></div>
                    <div className='flex flex-col h-28 justify-center       max-md:h-24 max-xs:h-20'>
                        <h3 className='flex items-center font-mono tracking-widest gap-1'><span className='text-3xl text-[#ff0000] font-bold'>N</span> MOVIE</h3>
                        <h4 className='text-[22px] font-bold        max-md:text-xl max-xs:text-base'>{movies[0].title}</h4>
                    </div>
                </div>

                <h5 className='flex items-center font-semibold text-sm mt-1     max-md:text-[12px] max-xs:mt-0'>
                    Movies
                    <BsDot className='text-3xl' />
                    Action
                </h5>

                <h5 className='font-semibold      max-md:text-sm max-xs:text-[12px]'>Included with your membership</h5>

                <div className='flex mt-5 justify-between       max-xs:mt-2'>

                    <div className='flex gap-4      max-md:gap-2'>
                        <button onClick={() => {
                            setShowVideoPlayer(true);
                            setPlayerMovieName(movies[0].title);
                        }}
                            id='play-movie-btn'
                            className='flex items-center w-32 h-[52px] rounded justify-center text-xl text-black font-semibold bg-white gap-2         max-md:text-lg max-md:w-24 max-md:h-[40px] max-xs:text-[15px] max-xs:gap-1 max-xs:w-20 max-xs:h-[33px]'>
                            <IoMdPlay className='text-3xl       max-md:text-2xl max-xs:text-lg' />
                            Play
                        </button>

                        <button onClick={() => {
                            setShowModal(true);
                            setModalDetails({
                                movieName: movies[0].title,
                                movieDesc: movies[0].overview
                            })
                        }}
                            id='more-info-btn'
                            className='flex items-center w-40 h-[52px] rounded justify-center text-lg font-semibold gap-2       max-md:text-lg max-md:w-36 max-md:font-normal max-md:h-[40px] max-xs:text-[15px] max-xs:gap-1 max-xs:h-[33px] max-xs:w-28' style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                            <MdInfoOutline className='text-3xl max-xs:text-lg' />
                            More info
                        </button>
                    </div>

                    <div className='flex items-center gap-4     max-xs:gap-2'>
                        <div className='w-12 h-12 border rounded-full flex      max-md:w-9 max-md:h-9'>
                            <LiaVolumeOffSolid className='m-auto text-3xl       max-md:text-2xl' />
                        </div>

                        <h6 className='bg-[#555] border-l-4 h-4/5 flex items-center w-28 pl-4 text-xl font-bold     max-md:w-20 max-md:text-lg max-xs:w-16 max-xs:pl-2'>18+</h6>
                    </div>

                </div>

            </div>

            <div className='pl-12 mt-12 z-20 relative flex flex-col gap-12 overflow-visible      max-xs:gap-6 max-xs:pl-6 max-xs:mt-10'>
                <MoviesList setShowVideoPlayer={setShowVideoPlayer} setPlayerMovieName={setPlayerMovieName} setModalDetails={setModalDetails} setShowModal={setShowModal} numOfMovies={6} title="Today's Top Picks for You" />
                {/* <MoviesList setModalDetails={setModalDetails} apiData={apiData.slice(8, 10)} setShowModal={setShowModal} numOfMovies={3} title='Continue Watching for Hamza Malik' /> */}
                <NumberedMovieList setModalDetails={setModalDetails} apiData={movies.slice(10, 20)} numOfMovies={10} setShowModal={setShowModal} title='Top 10 Shows Today' />
            </div>

            <div>asd</div>
        </div>
    )
}

export default MovieOverviewSec;