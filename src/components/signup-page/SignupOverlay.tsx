'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

function SignupOverlay() {
    const router = useRouter();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [OTP, setOTP] = useState<string>('');
    
    const [showOTPPage, setShowOTPPage] = useState<boolean>(true);

    const [sentOTP, setSentOTP] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const res = await axios.post('/api/signup', { username, email, password });
        console.log(res);

    };


    const handleSendOTP = async (e: FormEvent) => {
        e.preventDefault();
        const text = String(Math.ceil(Math.random() * 9999));
        setSentOTP(text);

        const res2 = await axios.post('/api/verification-email', { to: email, text });
        console.log(res2);
        toast.success('OTP Sent!');
    };

    const handleProceed = (e: FormEvent) => {
        e.preventDefault();

        if (OTP === sentOTP) {
            setShowOTPPage(false);
        }
    };


    return (
        <div className='w-[440px] h-full mx-auto px-14 py-12        max-md:w-[90%] max-md:max-w-[440px] max-sm:px-8' style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            {
                showOTPPage ? (
                    <form
                        className='flex flex-col gap-4'
                        onSubmit={handleProceed}
                    >

                        <h2 className='text-white text-4xl font-bold mb-5       max-xs:text-3xl'>Create Account</h2>

                        <input
                            className='h-14 bg-zinc-900 rounded border border-[#777] px-4 text-[#ccc]'
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className='flex'>
                            <input
                                className='h-14 bg-zinc-900 rounded-l border border-[#777] px-4 text-[#ccc]'
                                type="password"
                                placeholder='Enter OTP'
                                value={OTP}
                                onChange={(e) => setOTP(e.target.value)}
                                maxLength={4}
                            />

                            <button className='w-full border h-14 rounded-r bg-red-500 text-white' onClick={handleSendOTP}>Send OTP</button>
                        </div>

                        <button className='h-10 flex justify-center items-center bg-red-600 rounded text-white font-semibold'>
                            Proceed
                        </button>

                        <p className='text-[#aaa]'>Already have an Account? <span onClick={() => router.push('/login')} className='cursor-pointer hover:underline text-white font-semibold'>Login Now</span></p>

                        <p className='text-[#aaa] text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime tempore distinctio.  <span className='text-blue-500 cursor-pointer'>Learn more</span></p>

                    </form>
                ) : (
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
                )
            }

            <Toaster />
        </div>
    )
}

export default SignupOverlay;