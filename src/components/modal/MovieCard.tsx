import Image from 'next/image'
import React from 'react'
import { GoPlus } from 'react-icons/go'

function MovieCard() {
    let num = Math.ceil(Math.random() * 8);

    return (
        <div className='w-[32%] h-72 bg-zinc-800 rounded-sm     max-sm:w-[48%]'>
            <Image
                src={`/movie-poster${num}.jpg`}
                alt="Movie Poster"
                layout="omit"
                width={200}
                height={200}
                className="w-full h-1/2 object-cover"
            />

            <div className='flex items-center justify-between px-4 pt-2     max-xs:px-2'>
                <div className='flex gap-2'>
                    <h6 className='h-fit text-[#aaa] text-[11px] border px-2 border-[#777]'>18+</h6>
                    <h6 className='text-[12px] text-[#aaa]'>2010</h6>
                </div>

                <div className='border rounded-full w-10 h-10 flex cursor-pointer justify-center items-center text-3xl      max-xs:w-8 max-xs:h-8 max-xs:text-2xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                    <GoPlus />
                </div>
            </div>

            <p className='text-[11px] text-[#ccc] px-4 py-2 font-normal     max-xs:px-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus nulla non dolor natus a.</p>
        </div>
    )
}

export default MovieCard
