import React, { Dispatch, SetStateAction } from 'react'
import { BsDot } from 'react-icons/bs';
import { HiOutlineDeviceMobile } from 'react-icons/hi';
import { LiaVolumeOffSolid } from 'react-icons/lia';
import { LuSend } from 'react-icons/lu';
import MoviesList from './MoviesList';

function MovieOverviewSec({ setShowModal }: { setShowModal: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div>
            <video
                src="/bg-video.mp4"
                className='absolute h-screen w-full object-cover inset-0'
                autoPlay
                loop
                muted
            />

            <div className='z-10 mt-56 ml-14 text-white relative'>

                <div className='flex gap-4'>
                    <div className='w-28 h-28 rounded-2xl bg-green-700 bg-[url("/overview-img.jpg")] bg-cover bg-center' style={{ boxShadow: '1px 1px 25px 2px #111' }}></div>
                    <div className='flex flex-col h-28 justify-center'>
                        <h3 className='flex items-center font-mono tracking-widest gap-1'><span className='text-3xl text-[#ff0000] font-bold'>N</span> GAME</h3>
                        <h4 className='text-[22px] font-bold'>Squid Game: Unleashed</h4>
                    </div>
                </div>

                <h5 className='flex items-center font-semibold text-sm mt-1'>
                    Mobile Game
                    <BsDot className='text-3xl' />
                    Action
                </h5>

                <h5 className='text- font-semibold'>Included with your membership</h5>

                <div className='flex mt-5 justify-between'>

                    <div className='flex gap-4'>
                        <button className='flex items-center w-52 h-[52px] rounded justify-center text-lg text-black font-semibold bg-white'>
                            <HiOutlineDeviceMobile className='text-2xl' />
                            Get Mobile Game
                        </button>

                        <button className='flex items-center w-72 h-[52px] rounded justify-center text-lg font-semibold gap-1' style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                            <LuSend />
                            Send to My Mobile Device
                        </button>
                    </div>

                    <div className='flex items-center gap-4'>
                        <div className='w-12 h-12 border rounded-full flex'>
                            <LiaVolumeOffSolid className='m-auto text-3xl' />
                        </div>

                        <h6 className='bg-[#555] border-l-4 h-4/5 flex items-center w-28 pl-4 text-xl font-bold'>18+</h6>
                    </div>

                </div>

            </div>

            <div className='pl-12 mt-12 z-10 relative flex flex-col gap-12'>
                <MoviesList setShowModal={setShowModal} numOfMovies={8} title="Today's Top Picks for You" />
                <MoviesList setShowModal={setShowModal} numOfMovies={3} title='Continue Watching for Hamza Malik' />
            </div>

            <div>asd</div>
        </div>
    )
}

export default MovieOverviewSec;