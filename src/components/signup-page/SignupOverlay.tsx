'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { SyncLoader } from 'react-spinners';

function SignupOverlay() {
    const router = useRouter();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [OTP, setOTP] = useState<string>('');

    const [showOTPPage, setShowOTPPage] = useState<boolean>(true);

    const [sentOTP, setSentOTP] = useState<string>('');

    const [creatingAccount, setCreatingAccount] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setCreatingAccount(true);

        try {
            const res = await axios.post('/api/signup', { username, email, password });
            toast.success('Account Created, Login Now!');
            console.log(res);
            router.replace('/login');
        } catch (error: any) {
            console.log(error)
        } finally {
            setCreatingAccount(false);
        }
    };


    const handleSendOTP = async (e: FormEvent) => {
        e.preventDefault();
        if (!email.includes('@') || !email.includes('.')) return toast.error('Enter Valid Email');
        setIsOTPSent(true);
        const text = String(Math.ceil(Math.random() * 9999));
        setSentOTP(text);

        const toastId = toast.loading('Sending OTP');

        try {
            const res2 = await axios.post('/api/verification-email', { to: email, text });
            console.log(res2);

            if (res2.data.message == 'User with this Email already exists') {
                toast.error(res2.data.message, { id: toastId })
            } else {
                toast.success('OTP Sent!', { id: toastId });
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleProceed = async (e: FormEvent) => {
        e.preventDefault();

        if (OTP === sentOTP && OTP !== '') {
            setShowOTPPage(false);
        } else {
            toast.error('Please Enter OTP correctly');
            setOTP('');
        }
    };

    const [isOTPSent, setIsOTPSent] = useState<boolean>(false);


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
                            id='otp-email'
                            className='h-14 bg-zinc-900 rounded border border-[#777] px-4 text-[#ccc]'
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className='flex'>
                            <input
                                id='otp'
                                className='h-14 bg-zinc-900 rounded-l border-y border-l border-[#777] px-4 text-[#ccc]'
                                type="password"
                                placeholder='Enter OTP'
                                value={OTP}
                                onChange={(e) => setOTP(e.target.value)}
                                maxLength={4}
                            />

                            {isOTPSent ? (
                                <button disabled className='disabled:cursor-not-allowed disabled:bg-red-900 w-full h-14 rounded-r border-r border-t border-b bg-red-500 text-white hover:bg-red-600 active:bg-red-400' onClick={handleSendOTP}>Send OTP</button>
                            ) : (
                                <button id='send-otp-btn' className='w-full h-14 rounded-r border-r border-t border-b bg-red-500 text-white hover:bg-red-600 active:bg-red-400' onClick={handleSendOTP}>Send OTP</button>
                            )}

                        </div>

                        <button
                            className='h-10 flex justify-center items-center bg-red-600 hover:bg-red-700 active:bg-red-500 rounded text-white font-semibold'
                        >
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
                            required
                        />

                        <input
                            className='h-14 bg-zinc-900 rounded border border-[#777] px-4 text-[#ccc]'
                            type="email"
                            placeholder='Email'
                            value={email}
                            readOnly
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

                        {creatingAccount ? (
                            <button disabled className='h-10 flex justify-center items-center disabled:bg-red-900 disabled:cursor-not-allowed bg-red-600 hover:bg-red-700 active:bg-red-500 rounded text-white font-semibold'>
                                <SyncLoader color='#fff' size={8} />
                            </button>
                        ) : (
                            <button className='h-10 flex justify-center items-center bg-red-600 hover:bg-red-700 active:bg-red-500 rounded text-white font-semibold'>
                                Create Account
                            </button>
                        )}


                        <p className='text-[#aaa]'>Already have an Account? <span onClick={() => router.push('/login')} className='cursor-pointer hover:underline text-white font-semibold'>Login Now</span></p>

                        <p className='text-[#aaa] text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime tempore distinctio.  <span className='text-blue-500 cursor-pointer'>Learn more</span></p>

                    </form>
                )
            }

            <Toaster containerStyle={{
                zIndex: 9999999999999999
            }} />
        </div>
    )
}

export default SignupOverlay;