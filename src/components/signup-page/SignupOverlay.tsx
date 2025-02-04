'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function SignupOverlay() {
    const router = useRouter();

    const [signupUsername, setSignupUsername] = useState<string>('');
    const [signupEmail, setSignupEmail] = useState<string>('');
    const [signupPassword, setSignupPassword] = useState<string>('');

    return (
        <div className='w-[440px] h-full mx-auto px-14 py-12        max-md:w-[90%] max-md:max-w-[440px] max-sm:px-8' style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <form
                className='flex flex-col gap-4'
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log({
                        signupUsername,
                        signupEmail,
                        signupPassword
                    });
                }}
            >

                <h2 className='text-white text-4xl font-bold mb-5       max-xs:text-3xl'>Create Account</h2>

                <input
                    className='h-14 bg-zinc-900 rounded border border-[#777] px-4 text-[#ccc]'
                    type="text"
                    placeholder='Username'
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                />

                <input
                    className='h-14 bg-zinc-900 rounded border border-[#777] px-4 text-[#ccc]'
                    type="email"
                    placeholder='Email'
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                />

                <input
                    className='h-14 bg-zinc-900 rounded border border-[#777] px-4 text-[#ccc]'
                    type="password"
                    placeholder='Passwords'
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                />

                <button className='h-10 flex justify-center items-center bg-red-600 rounded text-white font-semibold'>
                    Create Account
                </button>

                <p className='text-[#aaa]'>Already have an Account? <span onClick={() => router.push('/login')} className='cursor-pointer hover:underline text-white font-semibold'>Login Now</span></p>

                <p className='text-[#aaa] text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime tempore distinctio.  <span className='text-blue-500 cursor-pointer'>Learn more</span></p>

            </form>
        </div>
    )
}

export default SignupOverlay;