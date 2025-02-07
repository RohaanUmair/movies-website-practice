'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { SyncLoader } from 'react-spinners';

function LoginOverlay() {
    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const res = await axios.post('/api/login', { email, password });
        if (res.data.error) {
            toast.error(res.data.error)
        }
        router.push('/')
        setIsSubmitting(false);
    };

    return (
        <div className='w-[440px] h-full mx-auto px-14 py-12        max-md:w-[90%] max-md:max-w-[440px] max-sm:px-8' style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <form
                className='flex flex-col gap-4'
                onSubmit={handleSubmit}
            >

                <h2 className='text-white text-4xl font-bold mb-5'>Login</h2>

                <input
                    className='h-14 bg-zinc-900 rounded border border-[#777] px-4 text-[#ccc]'
                    type="email"
                    placeholder='Email or mobile number'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    className='h-14 bg-zinc-900 rounded border border-[#777] px-4 text-[#ccc]'
                    type="password"
                    placeholder='Passwords'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                />

                {isSubmitting ? (
                    <button disabled className='disabled:bg-red-900 h-10 flex bg-red-600 rounded text-white font-semibold justify-center items-center'>
                        <SyncLoader color="#fff" size={8}/>
                    </button>
                ) : (
                    <button className='h-10 flex bg-red-600 hover:bg-red-700 active:bg-red-500 rounded text-white font-semibold justify-center items-center'>
                        Login In
                    </button>
                )}

                <p className='text-center text-white'>OR</p>

                <button className='h-10 bg-zinc-600 rounded text-white font-semibold'>Use a Login-In Code</button>

                <p className='text-center text-white hover:underline cursor-pointer' onClick={() => router.push('/reset-password')}>Forgot password?</p>

                <div className='flex gap-3'>
                    <input type="checkbox" className='scale-150' />
                    <p className='text-white'>Remember me</p>
                </div>

                <p className='text-[#aaa]'>New to Netflix? <span onClick={() => router.push('/signup')} className='text-white font-semibold cursor-pointer hover:underline'>Sign up now.</span></p>

                <p className='text-[#aaa] text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime tempore distinctio.  <span className='text-blue-500 cursor-pointer'>Learn more</span></p>

            </form>

            <Toaster />
        </div>
    )
}

export default LoginOverlay;