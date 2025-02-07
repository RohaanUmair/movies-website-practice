'use client';
import Header from "@/components/home-page/Header";
import { RootState } from "@/states/store";
import Link from "next/link";
import { GoCreditCard, GoShieldCheck } from "react-icons/go";
import { HiMiniUsers } from "react-icons/hi2";
import { IoIosArrowForward, IoIosArrowRoundBack } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { PiDevicesBold, PiHouseBold, PiWarningOctagonBold } from "react-icons/pi";
import { useSelector } from "react-redux";

function ProfilePage() {
    const liStyles = "flex items-center cursor-pointer gap-2 font-sans font-bold text-zinc-600";

    const username = useSelector((state: RootState) => state.user.username);

    return (
        <div className='w-full h-screen bg-zinc-100'>
            <Header />

            <div className="flex px-12 pt-6         max-md:justify-between max-md:px-6">

                <div className="flex flex-col gap-10 w-[29%]        max-xs:w-fit">

                    <Link href={'/'}>
                        <button className="flex items-center text-sm font-semibold gap-2 hover:underline        max-xs:hidden"><IoIosArrowRoundBack className="text-3xl" /> Back to Movies</button>
                        <IoIosArrowRoundBack className="text-3xl xs:hidden" />
                    </Link>

                    <ul className="flex flex-col gap-6">
                        <li className={liStyles}><PiHouseBold className="text-2xl" /><p className="font-sans        max-xs:hidden">Overview</p></li>
                        <li className={liStyles}><GoCreditCard className="text-2xl" /><p className="font-sans       max-xs:hidden">Membership</p></li>
                        <li className={liStyles}><GoShieldCheck className="text-2xl" /><p className="font-sans      max-xs:hidden">Security</p></li>
                        <li className={liStyles}><PiDevicesBold className="text-2xl" /><p className="font-sans      max-xs:hidden">Devices</p></li>
                        <li className="flex items-center cursor-pointer gap-2 font-sans font-bold text-black"><HiMiniUsers className="text-2xl" /><p className="font-sans       max-xs:hidden">Profiles</p></li>
                    </ul>

                </div>


                <div className="flex flex-col w-[65%]       max-md:w-[68%] max-xs:w-[86%]">

                    <h1 className="text-[35px] font-bold">Profiles</h1>
                    <h4 className="font-semibold text-zinc-700">Parental Controls and Permissions</h4>


                    <div className="border-2 border-zinc-200 bg-white rounded-lg">
                        <div className="flex flex-col px-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4 py-4">
                                    <PiWarningOctagonBold className="text-3xl" />
                                    <div>
                                        <h2 className="text-[17px] font-sans font-semibold">Adjust parental controls</h2>
                                        <h6 className="text-sm font-sans font-semibold text-zinc-600">Set maturity ratings, block titles</h6>
                                    </div>
                                </div>

                                <IoIosArrowForward className="text-lg" />
                            </div>


                            <div className="border-t flex justify-between items-center">
                                <div className="flex items-center gap-4 py-4">
                                    <LuUsers className="text-3xl" />
                                    <div>
                                        <h2 className="text-[17px] font-sans font-semibold">Transfer a profile</h2>
                                        <h6 className="text-sm font-sans font-semibold text-zinc-600">Copy a profile to another account</h6>
                                    </div>
                                </div>

                                <IoIosArrowForward className="text-lg" />
                            </div>
                        </div>
                    </div>


                    <h4 className="font-semibold text-zinc-700 mt-6">Profile Settings</h4>
                    <div className="border-2 border-zinc-200 bg-white px-6 rounded-lg flex flex-col">
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4 py-4">
                                    <div className="w-10 h-10 bg-blue-500 rounded"></div>
                                    <h2 className="text-[17px] font-sans font-semibold">{username}</h2>
                                </div>

                                <IoIosArrowForward className="text-lg" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex justify-between border-t items-center">
                                <div className="flex items-center gap-4 py-4">
                                    <div className="w-10 h-10 rounded flex overflow-hidden relative">
                                        <div className="absolute w-full h-full backdrop-blur-sm flex justify-center items-center"><h4 className="text-sm font-bold text-white      max-sm:text-4xl">kids</h4></div>
                                        <div className="w-[20%] h-full bg-gradient-to-b from-green-500 to-purple-500"></div>
                                        <div className="w-[25%] h-full bg-gradient-to-b from-yellow-500 to-orange-700"></div>
                                        <div className="w-[35%] h-full bg-gradient-to-b from-purple-500 to-purple-500"></div>
                                        <div className="w-[20%] h-full bg-gradient-to-b from-blue-200 to-blue-500"></div>
                                    </div>                                    <h2 className="text-[17px] font-sans font-semibold">Kids</h2>
                                </div>

                                <IoIosArrowForward className="text-lg" />
                            </div>
                        </div>

                        <button className="bg-[#ddd] font-bold rounded w-full mx-auto h-12">Add Profile</button>

                        <p className="mx-auto my-4 text-[#777]">Add up to 5 profiles for anyone who lives with you.</p>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default ProfilePage;