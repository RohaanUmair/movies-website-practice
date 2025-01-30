import React from 'react'

function SignupOverlay() {
    return (
        <div className='w-[440px] h-full border mx-auto'>
            <form className='flex flex-col'>

                <h2 className='text-white text-[40px] font-bold'>Sign In</h2>

                <input
                    type="email"
                    placeholder='Email or mobile number'
                />

                <input
                    type="password"
                    placeholder='Passwords'
                />

                <button>Sign In</button>

                <p>OR</p>

                <button>Use a Sign-In Code</button>

                <p>Forgot password?</p>

                <div>
                    <input type="checkbox" name="" id="" />
                    <p>Remember me</p>
                </div>

                <p>New to Netflix? <span>Sign up now.</span></p>

                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime tempore distinctio dolorum eum cupiditate.</p>

            </form>
        </div>
    )
}

export default SignupOverlay
