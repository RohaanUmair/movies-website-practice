import SignupOverlay from '@/components/login-page/SignupOverlay';
import React from 'react'

function LoginPage() {
    return (
        <div className='w-full min-h-screen h-full flex flex-col px-44 bg-zinc-900'>
            <header className='h-24 flex items-center'><h1 className='text-red-700 text-5xl font-semibold'>Movies</h1></header>

            <SignupOverlay />
        </div>
    )
}

export default LoginPage;