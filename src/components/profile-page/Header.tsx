'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaRegUser } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { IoMdArrowDropdown, IoMdHelpCircleOutline } from 'react-icons/io';
import { TbRobotFace } from 'react-icons/tb';
import { TiPencil } from 'react-icons/ti';

function Header() {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const router = useRouter();

    const handleLogout = async () => {
        const res = await axios.post('/api/logout');
        router.replace('/login')
        console.log(res);
    }

    return (
        <header className='h-20 w-full flex items-center justify-between px-12 gap-8 relative z-10 border-b bg-white         max-md:px-6 max-md:h-16'>
            <h1 className='z-10 text-[#ff0000] text-4xl font-semibold'>Movies</h1>

            <div className="flex items-center relative gap-1" onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
                <div className="w-10 h-10 bg-blue-500 rounded-sm flex       max-sm:w-6 max-sm:h-6"><TbRobotFace className="text-white text-3xl m-auto       max-sm:text-2xl" /></div>
                <IoMdArrowDropdown className="text-2xl" />

                {showMenu && (
                    <div className='w-56 h-fit absolute top-0 right-0 pt-10'>
                        <ul className='text-white cursor-default overflow-hidden text-sm pt-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                            <li className='py-[6px] px-4 hover:bg-zinc-900 cursor-pointer flex items-center gap-2'><div className='w-10 h-10 bg-blue-500 rounded'></div> Hamza</li>
                            <li className='py-[6px] px-4 hover:bg-zinc-900 cursor-pointer flex items-center gap-2'><TiPencil className='text-2xl' />Manage Profiles</li>
                            <li className='py-[6px] px-4 hover:bg-zinc-900 cursor-pointer flex items-center gap-2'><FiUsers className='text-2xl' />Transfer Profile</li>
                            <li className='py-[6px] px-4 hover:bg-zinc-900 cursor-pointer flex items-center gap-2'><FaRegUser className='text-2xl' />Account</li>
                            <li className='py-[6px] px-4 hover:bg-zinc-900 cursor-pointer flex items-center gap-2'><IoMdHelpCircleOutline className='text-2xl' />Help Center</li>
                            <li
                                className='hover:bg-zinc-900 cursor-pointer flex items-center justify-center gap-2 border-t py-4   '
                                onClick={handleLogout}
                            >
                                Logout from MOVIES</li>
                        </ul>
                    </div>
                )}
            </div>

        </header>
    )
}

export default Header
