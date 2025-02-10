'use client';
import Header from "@/components/home-page/Header";
import Link from "next/link";
import { GoCreditCard, GoShieldCheck } from "react-icons/go";
import { HiMiniUsers } from "react-icons/hi2";
import { IoIosArrowForward, IoIosArrowRoundBack } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { PiDevicesBold, PiHouseBold, PiWarningOctagonBold } from "react-icons/pi";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAccNames, setUserAccType } from "@/states/user/userSlice";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { setLikedMovies } from "@/states/movies/moviesSlice";
import Image from "next/image";


function ProfilePage() {
    const liStyles = "flex items-center cursor-pointer gap-2 font-sans font-bold text-zinc-600";

    const accNames = Cookies.get('accNames')?.split(',');

    const [newProfileName, setNewProfileName] = useState('');
    const [showAddProfileModal, setShowAddProfileModal] = useState(false);


    const dispatch = useDispatch();

    const router = useRouter();

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get('/api/addProfile');
                console.log(res.data.data.accNames);

                Cookies.set('accNames', res.data.data.accNames);
                dispatch(setAccNames(res.data.data.accNames));

            } catch (error: any) {
                console.log(error);
            }
        }

        getData();
    }, []);

    const email = Cookies.get('userEmail');
    const handleCreateProfile = async () => {
        if (!newProfileName.trim()) return;

        try {

            const res = await axios.put('/api/addProfile', { email, accName: newProfileName })

            if (res.status == 200) {
                setShowAddProfileModal(false);

                try {
                    const res = await axios.get('/api/addProfile');
                    console.log(res.data.data.accNames);

                    Cookies.set('accNames', res.data.data.accNames);
                    dispatch(setAccNames(res.data.data.accNames));

                    router.refresh();

                    setNewProfileName('');

                } catch (error: any) {
                    console.log(error);
                }

            } else {
                console.error(res.data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


    const handleDeleteProfile = async (profileName: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {

                    try {
                        const res = await axios.put('/api/delProfile', { email, accName: profileName });
                        console.log(res);

                        Cookies.set('accNames', res.data.data.accNames);
                        dispatch(setAccNames(res.data.data.accNames));

                        router.refresh();
                    } catch (error: any) {
                        console.log(error);
                    }

                }
            });
    };

    const handleEditProfile = async () => {
        try {
            const res = await axios.put('/api/editProfile', { email, accName: toBeUpdatedName, newAccName: editedProfileName });
            console.log(res);

            Cookies.set('accNames', res.data.data.accNames);
            dispatch(setAccNames(res.data.data.accNames));

            router.refresh();
        } catch (error: any) {
            console.log(error);
        } finally {
            setShowEditProfileModal(false);
            setEditedProfileName('');

            dispatch(setLikedMovies([]));

            Cookies.set('accType', 'kids');
            dispatch(setUserAccType('kids'));
        }
    };



    const [toBeUpdatedName, setToBeUpdatedName] = useState<string>('');
    const [editedProfileName, setEditedProfileName] = useState<string>('');
    const [showEditProfileModal, setShowEditProfileModal] = useState<boolean>(false);

    const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

    return (
        <div className='w-full min-h-screen bg-zinc-100'>
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
                                    <div className="w-10 h-10 rounded flex overflow-hidden relative">
                                        <div className="absolute w-full h-full backdrop-blur-sm flex justify-center items-center"><h4 className="text-sm font-bold text-white      max-sm:text-4xl">kids</h4></div>
                                        <div className="w-[20%] h-full bg-gradient-to-b from-green-500 to-purple-500"></div>
                                        <div className="w-[25%] h-full bg-gradient-to-b from-yellow-500 to-orange-700"></div>
                                        <div className="w-[35%] h-full bg-gradient-to-b from-purple-500 to-purple-500"></div>
                                        <div className="w-[20%] h-full bg-gradient-to-b from-blue-200 to-blue-500"></div>
                                    </div>
                                    <h2 className="text-[17px] font-sans font-semibold">Kids</h2>
                                </div>
                            </div>
                        </div>

                        {accNames?.slice(1).map((accName) => {
                            return (
                                <div className="flex flex-col  border-t" key={accName}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4 py-4">
                                            <div className="w-10 h-10 bg-blue-500 rounded"></div>
                                            <h2 className="text-[17px] font-sans font-semibold">{accName}</h2>
                                        </div>

                                        <div className="text-white rounded overflow-hidden">
                                            <button onClick={() => {
                                                setToBeUpdatedName(accName);
                                                setShowEditProfileModal(true);
                                            }} className="bg-green-500 px-3 py-1 hover:bg-green-600 active:bg-green-400">Edit</button>
                                            <button onClick={() => handleDeleteProfile(accName)} className="bg-red-500 px-3 py-1 hover:bg-red-600 active:bg-red-400">delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )}

                        {accNames?.length !== 5 && (
                            <>
                                <button onClick={() => setShowAddProfileModal(true)} className="bg-zinc-300 font-bold rounded w-full mx-auto h-12 hover:bg-zinc-400 active:bg-zinc-200 transition-colors">Add Profile</button>
                                <p className="mx-auto my-4 text-[#777]">Add up to 5 profiles for anyone who lives with you.</p>
                            </>
                        )}

                    </div>


                </div>

            </div>

            {showEditProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-md">
                        <h2 className="text-white text-2xl mb-4">Select Avatar</h2>
                        <div className="flex gap-4 mb-3">
                            <div className={`h-12 w-12 flex justify-center items-center border-blue-500 rounded-full ${selectedAvatar == 1 && ' border-2 '}`} onClick={() => setSelectedAvatar(1)}>
                                <Image
                                    layout="omit"
                                    width={100}
                                    height={100}
                                    alt="avatar1"
                                    src={'/avatar1.png'}
                                    className="w-10 h-10"
                                />
                            </div>

                            <div className={`h-12 w-12 flex justify-center items-center border-blue-500 rounded-full ${selectedAvatar == 2 && ' border-2 '}`} onClick={() => setSelectedAvatar(2)}>
                                <Image
                                    layout="omit"
                                    width={100}
                                    height={100}
                                    alt="avatar1"
                                    src={'/avatar2.png'}
                                    className="w-10 h-10"
                                />
                            </div>

                            <div className={`h-12 w-12 flex justify-center items-center border-blue-500 rounded-full ${selectedAvatar == 3 && ' border-2 '}`} onClick={() => setSelectedAvatar(3)}>
                                <Image
                                    layout="omit"
                                    width={100}
                                    height={100}
                                    alt="avatar1"
                                    src={'/avatar3.png'}
                                    className="w-10 h-10"
                                />
                            </div>

                            <div className={`h-12 w-12 flex justify-center items-center border-blue-500 rounded-full ${selectedAvatar == 4 && ' border-2 '}`} onClick={() => setSelectedAvatar(4)}>
                                <Image
                                    layout="omit"
                                    width={100}
                                    height={100}
                                    alt="avatar1"
                                    src={'/avatar4.png'}
                                    className="w-10 h-10"
                                />
                            </div>

                        </div>

                        <h2 className="text-white text-2xl mb-4">Edit Profile Name</h2>
                        <input
                            type="text"
                            placeholder="Profile Name"
                            value={editedProfileName}
                            onChange={(e) => setEditedProfileName(e.target.value)}
                            className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    setShowEditProfileModal(false);
                                    setSelectedAvatar(null);
                                }}
                                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleEditProfile();
                                    setSelectedAvatar(null);
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {showAddProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-md">
                        <h2 className="text-white text-2xl mb-4">Add New Profile</h2>
                        <input
                            type="text"
                            placeholder="Profile Name"
                            value={newProfileName}
                            onChange={(e) => setNewProfileName(e.target.value)}
                            className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowAddProfileModal(false)}
                                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleCreateProfile();
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Create Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Toaster />
        </div>
    )
}

export default ProfilePage;