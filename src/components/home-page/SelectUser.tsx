import { RootState } from '@/states/store';
import React, { Dispatch, SetStateAction } from 'react'
import { BiSolidPlusCircle } from 'react-icons/bi';
import { TbRobotFace } from 'react-icons/tb';
import { useSelector } from 'react-redux';

function SelectUser({ setSelectUser }: { setSelectUser: Dispatch<SetStateAction<boolean>> }) {
    const username = useSelector((state: RootState) => state.user.username);

    if (!username) {
        return (
            <div className='h-screen w-full bg-black flex justify-center items-center'>
                <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="h-screen w-screen bg-zinc-950 flex justify-center items-center">
            <div className="flex flex-col items-center justify-center gap-8">

                <h1 className="text-white text-6xl      max-sm:text-4xl max-sm:font-bold">{"Who's watching?"}</h1>

                <div className="flex gap-6      max-sm:gap-3">

                    <div onClick={() => setSelectUser(false)} className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-200">
                        <div className="w-36 h-36 bg-blue-500 rounded flex       max-sm:w-28 max-sm:h-28"><TbRobotFace className="text-white text-9xl m-auto     max-sm:text-8xl" /></div>
                        <h2 className="text-[#aaa] font-semibold">{username}</h2>
                    </div>

                    <div onClick={() => setSelectUser(false)} className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-200">
                        <div className="w-36 h-36 rounded flex overflow-hidden relative     max-sm:w-28 max-sm:h-28">
                            <div className="absolute w-full h-full backdrop-blur-sm flex justify-center items-center"><h4 className="text-5xl font-bold text-white      max-sm:text-4xl">kids</h4></div>
                            <div className="w-[20%] h-full bg-gradient-to-b from-green-500 to-purple-500"></div>
                            <div className="w-[25%] h-full bg-gradient-to-b from-yellow-500 to-orange-700"></div>
                            <div className="w-[35%] h-full bg-gradient-to-b from-purple-500 to-purple-500"></div>
                            <div className="w-[20%] h-full bg-gradient-to-b from-blue-200 to-blue-500"></div>
                        </div>
                        <h2 className="text-[#aaa] font-semibold">Kids</h2>
                    </div>


                    <div className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-200">
                        <div className="w-36 h-36 rounded flex justify-center items-center      max-sm:w-28 max-sm:h-28"><BiSolidPlusCircle className="text-[#aaa] text-8xl" /></div>
                        <h2 className="text-[#aaa] font-semibold">Add Profile</h2>
                    </div>

                </div>

                <button className="outline-none border border-[#aaa] text-[#aaa] px-4 py-[6px] rounded-sm hover:bg-[#aaa] hover:text-black transition-colors">Manage Profiles</button>

            </div>
        </div>
    )
}

export default SelectUser;