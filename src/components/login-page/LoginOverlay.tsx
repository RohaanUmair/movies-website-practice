'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function LoginOverlay() {
    const router = useRouter();

    const [loginEmail, setLoginEmail] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');

    return (
        <div className='w-[440px] h-full mx-auto px-14 py-12        max-md:w-[90%] max-md:max-w-[440px] max-sm:px-8' style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <form
                className='flex flex-col gap-4'
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(`Email: ${loginEmail}`);
                    console.log(`Password: ${loginPassword}`);
                }}
            >

                <h2 className='text-white text-4xl font-bold mb-5'>Login In</h2>

                <input
                    className='h-14 bg-zinc-900 rounded border border-[#777] px-4 text-[#ccc]'
                    type="email"
                    placeholder='Email or mobile number'
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                />

                <input
                    className='h-14 bg-zinc-900 rounded border border-[#777] px-4 text-[#ccc]'
                    type="password"
                    placeholder='Passwords'
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                />

                <button className='h-10 flex bg-red-600 rounded text-white font-semibold justify-center items-center'>
                    Login In
                </button>

                <p className='text-center text-white'>OR</p>

                <button className='h-10 bg-zinc-600 rounded text-white font-semibold'>Use a Login-In Code</button>

                <p className='text-center text-white'>Forgot password?</p>

                <div className='flex gap-3'>
                    <input type="checkbox" className='scale-150' />
                    <p className='text-white'>Remember me</p>
                </div>

                <p className='text-[#aaa]'>New to Netflix? <span onClick={() => router.push('/signup')} className='text-white font-semibold cursor-pointer hover:underline'>Sign up now.</span></p>

                <p className='text-[#aaa] text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime tempore distinctio.  <span className='text-blue-500 cursor-pointer'>Learn more</span></p>

            </form>
        </div>
    )
}

export default LoginOverlay;