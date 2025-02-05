'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

function ResetPasswordOverlay() {
    const [email, setEmail] = useState<string>('');

    const [sentOTP, setSentOTP] = useState<string>('');

    const [isOTPSent, setIsOTPSent] = useState<boolean>(false);

    const [isOTPSending, setIsOTPSending] = useState<boolean>(false);

    const [OTP, setOTP] = useState<string>('');

    const [showResetPassForm, setShowResetPassForm] = useState<boolean>(false);

    const router = useRouter();


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email.includes('@') || !email.includes('.')) return toast.error('Enter Valid Email');
        setIsOTPSending(true);
        const text = String(Math.ceil(Math.random() * 9999));
        setSentOTP(text);

        const toastId = toast.loading('Sending OTP')
        const res2 = await axios.post('/api/reset-pass', { to: email, text });
        console.log(res2);
        toast.success('OTP Sent!', { id: toastId });
        setIsOTPSent(true);
    }

    const handleSubmitOTP = async (e: FormEvent) => {
        e.preventDefault();

        if (OTP === sentOTP && OTP !== '') {
            setShowResetPassForm(true);
        } else {
            toast.error('Please Enter OTP correctly');
            setOTP('');
        }
    }

    const handleResetPassword = async (e: FormEvent) => {
        e.preventDefault();
        setResettingPass(true);

        if (password !== confirmPassword) {
            setResettingPass(false);
            return toast.error("Passwords don't match");
        }

        const res = await axios.put('/api/reset-pass', { email, password });
        console.log(res);

        toast.success('Password Reset successfully');

        router.push('/');
    }

    const [resettingPass, setResettingPass] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');


    return (
        <div className='m-auto bg-zinc-100 w-[360px] px-10 py-10'>
            <h1 className='text-3xl font-bold mb-2'>Reset Password</h1>

            {showResetPassForm ? (
                <form className='flex flex-col mt-8 gap-4' onSubmit={handleResetPassword}>
                    <div>
                        <p className='text-zinc-500 tracking-tight text-sm font-semibold'>Enter new Password</p>
                        <input
                            type="password"
                            placeholder='New password'
                            className='border border-zinc-300 h-10 rounded-[3px] px-4 w-full outline-none focus:ring-2 ring-blue-500 ring-offset-0'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            maxLength={12}
                            minLength={6}
                        />
                    </div>

                    <div>
                        <p className='text-zinc-500 tracking-tight text-sm font-semibold'>Confirm Password</p>
                        <input
                            type="password"
                            placeholder='Confirm new password'
                            className='border border-zinc-300 h-10 rounded-[3px] px-4 w-full outline-none focus:ring-2 ring-blue-500 ring-offset-0'
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            maxLength={12}
                            minLength={6}
                        />
                    </div>

                    {resettingPass ? (
                        <button disabled type='submit' className='disabled:bg-blue-900 cursor-not-allowed bg-blue-500 hover:bg-blue-600 active:bg-blue-400 w-full h-10 text-white'>Submit</button>
                    ) : (
                        <button type='submit' className='bg-blue-500 hover:bg-blue-600 active:bg-blue-400 w-full h-10 text-white'>Submit</button>
                    )}

                </form>
            ) : (


                isOTPSent ? (
                    <form className='flex flex-col mt-8 gap-4' onSubmit={handleSubmitOTP}>
                        <p className='text-zinc-500 tracking-tight text-sm font-semibold'>Please Enter the OTP sent on your Email</p>
                        <input
                            type="password"
                            placeholder='****'
                            className='border border-zinc-300 h-10 rounded-[3px] px-4 text-xl outline-none focus:ring-2 ring-blue-500 ring-offset-0'
                            required
                            value={OTP}
                            onChange={(e) => setOTP(e.target.value)}
                            maxLength={4}
                        />

                        <button type='submit' className='bg-blue-500 hover:bg-blue-600 active:bg-blue-400 w-full h-10 text-white'>Submit</button>
                    </form>
                ) : (
                    <>
                        <p className='text-zinc-500 tracking-tight text-sm font-semibold'>How would you like to reset your password?</p>

                        <div className='flex items-center gap-3 mt-3'>
                            <input type="radio" name='select' className='outline-none checked:bg-black' />
                            <p className='text-sm text-zinc-500'>Email</p>
                        </div>

                        <div className='flex items-center gap-3 mt-1'>
                            <input type="radio" name='select' className='outline-none checked:bg-black' />
                            <p className='text-sm text-zinc-500'>Text Message (SMS)</p>
                        </div>


                        <form className='flex flex-col mt-8 gap-4' onSubmit={handleSubmit}>
                            <p className='text-zinc-500 tracking-tight text-sm font-semibold'>We will send you an OTP on your Email</p>
                            <input
                                type="email"
                                placeholder='name@example.com'
                                className='border border-zinc-300 h-10 rounded-[3px] text-sm px-4 outline-none focus:ring-2 ring-blue-500 ring-offset-0'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {isOTPSending ? (
                                <button disabled type='submit' className='disabled:bg-blue-900 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 active:bg-blue-400 w-full h-10 text-white'>Email me</button>
                            ) : (
                                <button type='submit' className='bg-blue-500 hover:bg-blue-600 active:bg-blue-400 w-full h-10 text-white'>Email me</button>
                            )}
                        </form>
                    </>
                )
            )}


            <Toaster />
        </div>
    )
}

export default ResetPasswordOverlay

