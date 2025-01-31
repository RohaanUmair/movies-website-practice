import Image from 'next/image'
import React from 'react'
import { GoPlus } from 'react-icons/go'

function MovieCard() {
    return (
        <div className='w-[32%] h-72 bg-zinc-800 rounded-sm'>
            <Image
                src="/movie-poster3.jpg"
                alt="Movie Poster"
                layout="omit"
                objectFit="cover"
                objectPosition="center"
                width={200}
                height={200}
                className="w-full h-1/2"
            />

            <div className='flex items-center justify-between px-4 pt-2'>
                <div className='flex gap-2'>
                    <h6 className='h-fit text-[#aaa] text-[11px] border px-2 border-[#777]'>18+</h6>
                    <h6 className='text-[12px] text-[#aaa]'>2010</h6>
                </div>

                <div className='border rounded-full w-10 h-10 flex cursor-pointer justify-center items-center text-3xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                    <GoPlus />
                </div>
            </div>

            <p className='text-[11px] text-[#ccc] px-4 py-2 font-normal'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus nulla non dolor natus a.</p>
        </div>
    )
}

export default MovieCard
