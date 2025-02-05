import ResetPasswordOverlay from '@/components/reset-pass-page/ResetPasswordOverlay'
import Image from 'next/image'
import React from 'react'

function ResetPasswordPage() {
    return (
        <div className='px-40 w-full h-full flex flex-col'>
            <div className='absolute top-0 left-0 w-full h-full z-10'>
                <Image
                    src='/reset-pass-bg.jpg'
                    alt='background'
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                />
            </div>

            <header className='h-24 flex items-center'><h1 className='z-10 text-[#ff0000] text-5xl font-semibold       max-lg:px-[10%] max-md:text-4xl'>Movies</h1></header>

            <div className='z-20'>
                <ResetPasswordOverlay />
            </div>

        </div>
    )
}

export default ResetPasswordPage
