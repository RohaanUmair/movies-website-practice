'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

function SignupOverlay() {
    const router = useRouter();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const res = await axios.post('/api/signup', { username, email, password });
        console.log(res);

        const res2 = await axios.post('/api/verification-email', { to: email, text: '12312' });
        console.log(res2);
    };

    return (
        <div className='w-[440px] h-full mx-auto px-14 py-12        max-md:w-[90%] max-md:max-w-[440px] max-sm:px-8' style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <form
                className='flex flex-col gap-4'
                onSubmit={handleSubmit}
            >

                <h2 className='text-white text-4xl font-bold mb-5       max-xs:text-3xl'>Create Account</h2>

                <input
                    className='h-14 bg-zinc-900 rounded border border-[#777] px-4 text-[#ccc]'
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    className='h-14 bg-zinc-900 rounded border border-[#777] px-4 text-[#ccc]'
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className='h-14 bg-zinc-900 rounded border border-[#777] px-4 text-[#ccc]'
                    type="password"
                    placeholder='Passwords'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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