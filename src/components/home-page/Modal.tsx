'use client';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { BsChatSquareText } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';
import { HiOutlineHandThumbUp } from 'react-icons/hi2';
import { IoIosClose } from 'react-icons/io';
import { TbPlayerPlayFilled } from 'react-icons/tb';
import MovieCard from '../modal/MovieCard';
import MovieListPoster from './MovieListPoster';

function Modal({ setShowModal }: { setShowModal: Dispatch<SetStateAction<boolean>> }) {

    const modalRef = useRef(null);
    const closeBtnRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const a = modalRef?.current as any;
            const b = closeBtnRef?.current as any;

            if (a && !a.contains(e?.target) ||
                b && !b.contains(e?.target)
            ) {
                setShowModal(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    return (
        <div className='text-white fixed w-full h-full pt-14 z-50 top-0 flex justify-center' style={{ backgroundColor: 'rgb(0, 0, 0, 0.7)' }}>

            <div ref={modalRef} className='w-1/2 h-full overflow-y-scroll scrollbar-hide pb-10 bg-zinc-950 rounded-md'>

                <div className='relative flex flex-col'>
                    <video
                        src="/modal-bg-video.mp4"
                        className='h-96 w-full object-cover rounded-t-md'
                        autoPlay
                        loop
                        muted
                    />

                    <div ref={closeBtnRef} onClick={() => setShowModal(false)} className='p-1 rounded-full absolute right-4 top-4 cursor-pointer' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <IoIosClose className=' rounded-full text-4xl' />
                    </div>

                    <div className='absolute bottom-10 left-10'>
                        <h6 className='text-[#ff0000] text-3xl flex items-center font-bold translate-y-3 -translate-x-2'>N <span className='text-[12px] font-normal text-[#aaa]'>FILM</span></h6>

                        <h1 className='text-4xl font-semibold mb-4'>MOVIE</h1>

                        <div className='flex gap-2'>
                            <button className='text-xl font-bold h-10 w-28 gap-1 rounded justify-center flex items-center bg-white text-black'>
                                <TbPlayerPlayFilled />
                                Play
                            </button>

                            <div className='border rounded-full w-10 h-10 flex cursor-pointer justify-center items-center text-3xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                                <GoPlus />
                            </div>

                            <div className='border rounded-full w-10 h-10 flex cursor-pointer justify-center items-center text-[22px]' style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                                <HiOutlineHandThumbUp />
                            </div>
                        </div>
                    </div>
                </div>


                <div className='flex p-10'>

                    <div className='w-2/3 flex flex-col gap-1'>
                        <div className='flex text-[12px] font-semibold items-center gap-2 text-[#aaa]'>
                            <p>2025</p>
                            <p>1h 54m</p>
                            <BsChatSquareText />
                        </div>


                        <div className='flex items-center gap-2 mb-1'>
                            <h6 className='text-[#aaa] text-[11px] border px-2 border-[#777]'>18+</h6>
                            <p className='text-[11px] font-semibold'>romance, language, suggestive content</p>
                        </div>


                        <div className='flex items-center gap-2 mb-2'>
                            <div className='w-7 h-8 bg-[#ff0000] text-[10px] rounded leading-tight justify-center flex flex-col items-center font-bold'><p>Top</p><p>10</p></div>
                            <h3 className='font-semibold'>#2 in Movies Today</h3>
                        </div>


                        <p className='text-[13px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem itaque reiciendis rerum quod dolor! Architecto repudiandae dolorum consequatur quia voluptatum!</p>
                    </div>


                    <div className='w-1/3 flex flex-col text-[12px] gap-2'>
                        <p>
                            <span className='text-[#777] font-bold'>Cast:</span> Abcd Zxc, Opqrs Tuvw, Jkl Mnop, more
                        </p>

                        <p>
                            <span className='text-[#777] font-bold'>Genre:</span> Romantic Movies, Action Movies, Adventure Movies
                        </p>

                        <p>
                            <span className='text-[#777] font-bold'>This movie is:</span> Exciting
                        </p>
                    </div>

                </div>


                <div className='flex flex-col px-10 font-semibold'>
                    <h2 className='text-xl text-white'>More Like This</h2>

                    <div className='flex justify-between flex-wrap gap-y-5 mt-4 border-b'>
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                        <MovieCard />
                    </div>
                </div>


                <div className='flex flex-col px-10 pt-8'>
                    <h2 className='text-xl text-white font-semibold mb-3'>Trailers and More</h2>

                    <div className='flex gap-3'>
                        <div className='flex flex-col gap-2'>
                            <MovieListPoster setShowModal={setShowModal} />
                            <h5 className='text-[12px] font-semibold pl-2'>Trailer: Lorem, ipsum dolor.</h5>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <MovieListPoster setShowModal={setShowModal} />
                            <h5 className='text-[12px] font-semibold pl-2'>Trailer: Lorem, ipsum dolor.</h5>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Modal;