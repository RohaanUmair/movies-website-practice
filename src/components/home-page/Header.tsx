'use client';
import { RootState } from '@/states/store';
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BiHeart } from 'react-icons/bi';
import { FaRegBell } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { GoSearch } from 'react-icons/go'
import { IoMdArrowDropdown, IoMdHelpCircleOutline } from 'react-icons/io'
import { MdLiveTv } from 'react-icons/md';
import { TbRobotFace, TbUserMinus } from 'react-icons/tb'
import { TiPencil } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { setUserAccType } from '@/states/user/userSlice';

function Header() {
    const navs: string[] = ['TV Shows', 'Movies', 'New & Popular', 'My List', 'Browse by Language'];

    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState<boolean>(false);

    const router = useRouter();

    const handleLogout = async () => {
        const res = await axios.post('/api/logout');
        router.replace('/login');
        window.location.reload();

        console.log(res);
    }

    const username = useSelector((state: RootState) => state.user.username);
    const accType = useSelector((state: RootState) => state.user.userAccType);

    const liStyles = 'py-[6px] px-4 hover:bg-zinc-700 cursor-pointer flex items-center gap-2';

    const handleAccTypeChange = () => {
        if (accType == 'adult') {
            setShowMenu(false);
            Cookies.set('accType', 'kids');
            dispatch(setUserAccType('kids'));

            router.refresh();
        } else {
            setShowMenu(false);
            Cookies.set('accType', 'adult')
            dispatch(setUserAccType('adult'));

            router.refresh();
        }
    };

    return (
        <header className='h-20 flex items-center px-12 gap-8 relative z-50         max-md:px-6 max-md:h-16' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <h1 className='z-10 text-[#ff0000] text-3xl font-semibold'>Movies</h1>

            <div className="flex items-center justify-between w-full        max-lg:justify-end">

                <ul className="flex gap-4 text-white font-semibold text-sm      max-lg:hidden">
                    <Link href={'/'}>
                        <li className='cursor-pointer font-sans font-bold'>Home</li>
                    </Link>
                    {
                        navs.map((nav: string, index: number) => {
                            return (
                                <li className='cursor-pointer font-sans' key={index}>{nav}</li>
                            );
                        })
                    }
                </ul>

                <div className="flex text-white items-center gap-4      max-sm:gap-2">
                    <GoSearch className="text-3xl       max-md:text-2xl max-sm:text-xl" />
                    <h6>{accType == 'adult' ? (username) : (accType)}</h6>
                    <FaRegBell className="text-3xl      max-md:text-2xl max-sm:text-xl" />
                    <FiMenu className='lg:hidden text-2xl       max-sm:text-[22px]' />
                    <div className="flex items-center relative gap-1" onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
                        {accType == 'adult' ? (
                            <div className="w-10 h-10 bg-blue-500 rounded-sm flex       max-sm:w-6 max-sm:h-6"><TbRobotFace className="text-white text-3xl m-auto       max-sm:text-2xl" /></div>
                        ) : (
                            <div className="w-10 h-10 rounded flex overflow-hidden relative     max-sm:w-6 max-sm:h-6">
                                <div className="absolute w-full h-full backdrop-blur-sm flex justify-center items-center"><h4 className="text-sm font-bold text-white      max-sm:text-4xl">kids</h4></div>
                                <div className="w-[20%] h-full bg-gradient-to-b from-green-500 to-purple-500"></div>
                                <div className="w-[25%] h-full bg-gradient-to-b from-yellow-500 to-orange-700"></div>
                                <div className="w-[35%] h-full bg-gradient-to-b from-purple-500 to-purple-500"></div>
                                <div className="w-[20%] h-full bg-gradient-to-b from-blue-200 to-blue-500"></div>
                            </div>
                        )}
                        <IoMdArrowDropdown className="text-2xl" />

                        {showMenu && (
                            <div className='w-56 h-fit absolute top-0 right-0 pt-10'>
                                <ul className='text-white cursor-default overflow-hidden text-sm pt-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                                    <li className={liStyles} onClick={handleAccTypeChange}>
                                        {accType == 'kids' ? (
                                            <div className='w-10 h-10 bg-blue-500 rounded-sm flex justify-center items-center'><TbRobotFace className="text-white text-3xl m-auto" /></div>
                                        ) : (
                                            <div className="w-10 h-10 rounded flex overflow-hidden relative">
                                                <div className="absolute w-full h-full backdrop-blur-sm flex justify-center items-center"><h4 className="text-sm font-bold text-white      max-sm:text-4xl">kids</h4></div>
                                                <div className="w-[20%] h-full bg-gradient-to-b from-green-500 to-purple-500"></div>
                                                <div className="w-[25%] h-full bg-gradient-to-b from-yellow-500 to-orange-700"></div>
                                                <div className="w-[35%] h-full bg-gradient-to-b from-purple-500 to-purple-500"></div>
                                                <div className="w-[20%] h-full bg-gradient-to-b from-blue-200 to-blue-500"></div>
                                            </div>
                                        )}
                                        {accType == 'kids' ? (username) : (accType)}</li>

                                    <Link href={'/profile'}>
                                        <li className={liStyles}><TiPencil className='text-2xl' />Manage Profiles</li>
                                    </Link>

                                    <Link href={'/liked-movies'}>
                                        <li className={liStyles}><BiHeart className='text-2xl' />Liked Movies</li>
                                    </Link>

                                    <li className={liStyles}><MdLiveTv className='text-2xl' />Watchlist</li>
                                    <li className={liStyles}><IoMdHelpCircleOutline className='text-2xl' />Help Center</li>
                                    <li
                                        className='hover:bg-zinc-700 cursor-pointer flex items-center justify-center gap-2 border-t py-4   '
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