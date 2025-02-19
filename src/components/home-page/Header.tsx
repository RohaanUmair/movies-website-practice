'use client';
import { RootState } from '@/states/store';
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BiHeart } from 'react-icons/bi';
import { FaRegBell } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { GoSearch } from 'react-icons/go'
import { IoMdArrowDropdown, IoMdHelpCircleOutline } from 'react-icons/io'
import { MdLiveTv } from 'react-icons/md';
import { TbUserMinus } from 'react-icons/tb'
import { TiPencil } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { setUserAccType } from '@/states/user/userSlice';
import { setLikedMovies } from '@/states/movies/moviesSlice';
import Image from 'next/image';

function Header() {
    const navs: string[] = ['TV Shows', 'Movies', 'New & Popular', 'My List', 'Browse by Language'];

    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState<boolean>(false);

    const router = useRouter();

    const handleLogout = async () => {
        try {
            setShowMenu(false);
            await axios.post('/api/logout');
            window.location.reload();
            router.replace('/login');
        } catch (error) {
            console.log(error);
        }
    }

    const accType = useSelector((state: RootState) => state.user.userAccType);

    const accNames = useSelector((state: RootState) => state.user.accNames);

    const liStyles = 'py-[6px] px-4 hover:bg-zinc-700 cursor-pointer flex items-center gap-2';

    const handleAccTypeChange = (type: string) => {
        setShowMenu(false);
        dispatch(setLikedMovies([]));

        Cookies.set('accType', type);
        dispatch(setUserAccType(type));
        router.push('/');
    };

    const [avatar, setAvatar] = useState<number>();

    const accAvatarsCookie = Cookies.get('accAvatars');
    const accAvatars = accAvatarsCookie ? JSON.parse(accAvatarsCookie) : [];
    useEffect(() => {

        const avatarNumbers = accAvatars.map((av: { avatar: number }) => av.avatar);

        console.log(avatarNumbers, 'avatarssss');

        setAvatar(avatarNumbers[1]);
    }, [accAvatars]);


    return (
        <header className='h-20 flex items-center px-12 gap-8 relative z-50         max-md:px-6 max-md:h-16' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <h1 className='z-10 text-[#ff0000] text-3xl font-semibold' onClick={() => console.log('avatar', avatar)}>Movies</h1>

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
                    <h6>{accType}</h6>
                    <FaRegBell className="text-3xl      max-md:text-2xl max-sm:text-xl" />
                    <FiMenu className='lg:hidden text-2xl       max-sm:text-[22px]' />
                    <div id='open-menu-btn' className="flex items-center relative gap-1" onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
                        {accType !== 'kids' ? (
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex       max-sm:w-6 max-sm:h-6">
                                {avatar !== null && (
                                    <Image alt='avatar' src={`/avatar${avatar}.png`} layout='omit' width={80} height={80} className='w-10 h-10 object-cover' />
                                )}
                            </div>
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
                                    {accNames[1] && (
                                        <li className={liStyles} onClick={() =>
                                            accType == 'kids' ? (
                                                handleAccTypeChange(accNames[1])
                                            ) : (
                                                handleAccTypeChange('kids')
                                            )
                                        }>
                                            {accType == 'kids' ? (
                                                <div className='w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center'>
                                                    {avatar !== null && (
                                                        <Image alt='avatar' src={`/avatar${avatar}.png`} layout='omit' width={80} height={80} className='w-10 h-10 object-cover' />
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 rounded flex overflow-hidden relative">
                                                    <div className="absolute w-full h-full backdrop-blur-sm flex justify-center items-center"><h4 className="text-sm font-bold text-white      max-sm:text-4xl">kids</h4></div>
                                                    <div className="w-[20%] h-full bg-gradient-to-b from-green-500 to-purple-500"></div>
                                                    <div className="w-[25%] h-full bg-gradient-to-b from-yellow-500 to-orange-700"></div>
                                                    <div className="w-[35%] h-full bg-gradient-to-b from-purple-500 to-purple-500"></div>
                                                    <div className="w-[20%] h-full bg-gradient-to-b from-blue-200 to-blue-500"></div>
                                                </div>
                                            )}
                                            {accType == 'kids' ? (accNames[1]) : ('kids')}
                                        </li>
                                    )}

                                    <Link href={'/profile'}>
                                        <li id='profiles-page-btn' className={liStyles}><TiPencil className='text-2xl' />Manage Profiles</li>
                                    </Link>

                                    <Link href={'/liked-movies'}>
                                        <li id='liked-movies-page-btn' className={liStyles}><BiHeart className='text-2xl' />Liked Movies</li>
                                    </Link>

                                    <Link href={'/watchlist'}>
                                        <li id='watchlisted-movies-page-btn' className={liStyles}><MdLiveTv className='text-2xl' />Watchlist</li>
                                    </Link>

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