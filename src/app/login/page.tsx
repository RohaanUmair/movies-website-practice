import Footer from '@/components/login-page/Footer';
import LoginOverlay from '@/components/login-page/LoginOverlay';
import Image from 'next/image';
import React from 'react'

function LoginPage() {
    return (
        <div className='w-full min-h-screen h-full flex flex-col px-40 bg-black      max-lg:px-0'>
            <div className='absolute top-0 left-0 w-full h-full z-10'>
                <Image
                    src='/login-page-bg.jpg'
                    alt='background'
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                />
                <div className='absolute top-0 left-0 w-full h-full bg-black opacity-65 z-10'></div>
            </div>

            <header className='h-24 flex items-center'><h1 className='z-10 text-[#ff0000] text-5xl font-semibold       max-lg:px-[10%] max-md:text-4xl'>Movies</h1></header>

            <div className='z-20'>
                <LoginOverlay />
            </div>

            <Footer />
        </div>
    )
}

export default LoginPage;