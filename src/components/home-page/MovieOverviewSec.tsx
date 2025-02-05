import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { BsDot } from 'react-icons/bs';
import { LiaVolumeOffSolid } from 'react-icons/lia';
import MoviesList from './MoviesList';
import { IoMdPlay } from 'react-icons/io';
import { MdInfoOutline } from 'react-icons/md';
import NumberedMovieList from './NumberedMovieList';

function MovieOverviewSec({ setShowModal, setModalDetails }: {
    setShowModal: Dispatch<SetStateAction<boolean>>, setModalDetails: Dispatch<SetStateAction<{
        movieName: string;
        movieDesc: string;
    }>>;
}) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJjMDM5N2MyN2RkYjJmM2U4ODI4N2U1NTU5NTUyMSIsIm5iZiI6MTczODU4MDE1MC43OTAwMDAyLCJzdWIiOiI2N2EwYTBiNmU5OWRmMjNhOWYyNjc1MjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dG7wxvB4UCX128gdM4dJ6eO84r0DNYe0jzuk3orNCvQ'
        }
    };

    const [apiData, setApiData] = useState<any>([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));
    }, []);

    if (!apiData) {
        return (
            <div className='h-screen w-screen bg-black flex justify-center items-center'>
                <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
            </div>
        )
    }

    return (
        <div>
            <video
                src="/bg-video.mp4"
                className='absolute h-screen w-full object-cover inset-0        max-md:h-[60dvh]'
                autoPlay
                loop
                muted
            />

            <div className='z-10 mt-56 ml-14 text-white relative        max-md:mt-24 max-md:ml-8 max-xs:ml-4 max-xs:mt-36'>

                <div className='flex gap-4      max-xs:gap-2'>
                    <div className='w-28 h-28 rounded-2xl bg-green-700 bg-[url("/overview-img.jpg")] bg-cover bg-center         max-md:w-24 max-md:h-24 max-xs:w-20 max-xs:h-20' style={{ boxShadow: '1px 1px 25px 2px #111' }}></div>
                    <div className='flex flex-col h-28 justify-center       max-md:h-24 max-xs:h-20'>
                        <h3 className='flex items-center font-mono tracking-widest gap-1'><span className='text-3xl text-[#ff0000] font-bold'>N</span> GAME</h3>
                        <h4 className='text-[22px] font-bold        max-md:text-xl max-xs:text-base'>Squid Game: Unleashed</h4>
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
                        <button className='flex items-center w-32 h-[52px] rounded justify-center text-xl text-black font-semibold bg-white gap-2         max-md:text-lg max-md:w-24 max-md:h-[40px] max-xs:text-[15px] max-xs:gap-1 max-xs:w-20 max-xs:h-[33px]'>
                            <IoMdPlay className='text-3xl       max-md:text-2xl max-xs:text-lg' />
                            Play
                        </button>

                        <button className='flex items-center w-40 h-[52px] rounded justify-center text-lg font-semibold gap-2       max-md:text-lg max-md:w-36 max-md:font-normal max-md:h-[40px] max-xs:text-[15px] max-xs:gap-1 max-xs:h-[33px] max-xs:w-28' style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
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

            <div className='pl-12 mt-12 z-10 relative flex flex-col gap-12      max-xs:gap-6 max-xs:pl-6 max-xs:mt-10'>
                <MoviesList setModalDetails={setModalDetails} apiData={apiData.slice(0, 8)} setShowModal={setShowModal} numOfMovies={8} title="Today's Top Picks for You" />
                <MoviesList setModalDetails={setModalDetails} apiData={apiData.slice(8, 10)} setShowModal={setShowModal} numOfMovies={3} title='Continue Watching for Hamza Malik' />
                <NumberedMovieList setModalDetails={setModalDetails} apiData={apiData.slice(10, 20)} numOfMovies={10} setShowModal={setShowModal} title='Top 10 Shows Today' />
            </div>

            <div>asd</div>
        </div>
    )
}

export default MovieOverviewSec;