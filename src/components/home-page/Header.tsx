'use client';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaRegBell, FaUserCircle } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { GoSearch } from 'react-icons/go'
import { IoMdArrowDropdown } from 'react-icons/io'
import { TbRobotFace, TbUserMinus } from 'react-icons/tb'

function Header() {
    const navs: string[] = ['TV Shows', 'Movies', 'New & Popular', 'My List', 'Browse by Language'];

    const [showMenu, setShowMenu] = useState<boolean>(false);

    const router = useRouter();

    const handleLogout = async () => {
        const res = await axios.post('/api/logout');
        router.replace('/login')
        console.log(res);
    }

    return (
        <header className='h-20 flex items-center px-12 gap-8 relative z-10         max-md:px-6 max-md:h-16' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <h1 className='z-10 text-[#ff0000] text-3xl font-semibold'>Movies</h1>

            <div className="flex items-center justify-between w-full        max-lg:justify-end">

                <ul className="flex gap-4 text-white font-semibold text-sm      max-lg:hidden">
                    <li className='cursor-pointer font-sans font-bold'>Home</li>
                    {
                        navs.map((nav: string, index: number) => {
                            return (
                                <li className='cursor-pointer font-sans' key={index}>{nav}</li>
                            )
                        })
                    }
                </ul>

                <div className="flex text-white items-center gap-4      max-sm:gap-2">
                    <GoSearch className="text-3xl       max-md:text-2xl max-sm:text-xl" />
                    <h6>Kids</h6>
                    <FaRegBell className="text-3xl      max-md:text-2xl max-sm:text-xl" />
                    <FiMenu className='lg:hidden text-2xl       max-sm:text-[22px]' />
                    <div className="flex items-center relative gap-1" onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
                        <div className="w-10 h-10 bg-blue-500 rounded-sm flex       max-sm:w-6 max-sm:h-6"><TbRobotFace className="text-white text-3xl m-auto       max-sm:text-2xl" /></div>
                        <IoMdArrowDropdown className="text-2xl" />

                        {showMenu && (
                            <div className='w-28 h-fit absolute top-0 right-0 pt-10'>
                                <ul className='bg-white text-black rounded cursor-default overflow-hidden'>
                                    <li className='p-2 hover:bg-zinc-200 flex items-center gap-2'><FaUserCircle className='text-2xl' />Profile</li>
                                    <li
                                        className='p-2 hover:bg-zinc-200 flex items-center gap-2'
                                        onClick={handleLogout}
                                    >
                                        <TbUserMinus className='text-2xl' />Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header;