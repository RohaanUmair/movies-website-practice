import React from 'react'
import { FaRegBell } from 'react-icons/fa'
import { GoSearch } from 'react-icons/go'
import { IoMdArrowDropdown } from 'react-icons/io'
import { TbRobotFace } from 'react-icons/tb'

function Header() {
    const navs: string[] = ['TV Shows', 'Movies', 'New & Popular', 'My List', 'Browse by Language'];

    return (
        <header className='h-20 flex items-center px-12 gap-8 relative z-10' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <h1 className='z-10 text-[#ff0000] text-3xl font-semibold'>Movies</h1>

            <div className="flex items-center justify-between w-full">

                <ul className="flex gap-4 text-white font-semibold text-sm">
                    <li className='cursor-pointer font-sans font-bold'>Home</li>
                    {
                        navs.map((nav: string, index: number) => {
                            return (
                                <li className='cursor-pointer font-sans' key={index}>{nav}</li>
                            )
                        })
                    }
                </ul>

                <div className="flex text-white items-center gap-4">
                    <GoSearch className="text-3xl" />
                    <h6>Kids</h6>
                    <FaRegBell className="text-3xl" />
                    <div className="flex items-center gap-1">
                        <div className="w-10 h-10 bg-blue-500 rounded-sm flex"><TbRobotFace className="text-white text-3xl m-auto" /></div>
                        <IoMdArrowDropdown className="text-2xl" />
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header;