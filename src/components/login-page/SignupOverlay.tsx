import React from 'react'

function SignupOverlay() {
    return (
        <div className='w-[440px] h-full mx-auto px-14 py-12' style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
            <form className='flex flex-col gap-4'>

                <h2 className='text-white text-4xl font-bold mb-5'>Sign In</h2>

                <input
                    className='h-14 bg-zinc-900 rounded border border-[#777] px-4 text-[#ccc]'
                    type="email"
                    placeholder='Email or mobile number'
                />

                <input
                    className='h-14 bg-zinc-900 rounded border border-[#777] px-4 text-[#ccc]'
                    type="password"
                    placeholder='Passwords'
                />

                <button className='h-10 bg-red-600 rounded text-white font-semibold'>Sign In</button>

                <p className='text-center text-white'>OR</p>

                <button className='h-10 bg-zinc-600 rounded text-white font-semibold'>Use a Sign-In Code</button>

                <p className='text-center text-white'>Forgot password?</p>

                <div className='flex gap-3'>
                    <input type="checkbox" className='scale-150' />
                    <p className='text-white'>Remember me</p>
                </div>

                <p className='text-[#aaa]'>New to Netflix? <span className='text-white font-semibold'>Sign up now.</span></p>

                <p className='text-[#aaa] text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime tempore distinctio.  <span className='text-blue-500 cursor-pointer'>Learn more</span></p>

            </form>
        </div>
    )
}

export default SignupOverlay
