'use client';
import { RootState } from "@/states/store";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { PiWarningOctagonBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { setAccNames, setUserAccType } from "@/states/user/userSlice";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { setLikedMovies } from "@/states/movies/moviesSlice";
import EditProfileModal from "./EditProfileModal";
import AddProfileModal from "./AddProfileModal";


function MainContent() {
    const accNames = useSelector((state: RootState) => state.user.accNames);

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

    const email = useSelector((state: RootState) => state.user.userEmail);
    const handleCreateProfile = async () => {
        if (!newProfileName.trim()) return;

        try {
            const res = await axios.put('/api/addProfile', { email, accName: newProfileName, selectedAvatar })

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
                } finally {
                    const accAvatars = JSON.parse(Cookies.get('accAvatars'));

                    const avatarNumbers = accAvatars.map((av: { avatar: number }) => av.avatar);

                    setAvatars(avatarNumbers);

                    console.log(avatarNumbers, 'avatarssss');

                    router.refresh();
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
        if (!editedProfileName) return;

        try {
            const res = await axios.put('/api/editProfile', { email, accName: toBeUpdatedName, newAccName: editedProfileName, selectedAvatar });
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

            const accAvatars = JSON.parse(Cookies.get('accAvatars'));

            const avatarNumbers = accAvatars.map((av: { avatar: number }) => av.avatar);

            setAvatars(avatarNumbers);

            console.log(avatarNumbers, 'avatarssss');

            router.refresh();
        }
    };


    const [avatars, setAvatars] = useState<number[]>([]);

    useEffect(() => {
        try {
            const accAvatars = JSON.parse(Cookies.get('accAvatars'));

            const avatarNumbers = accAvatars.map((av: { avatar: number }) => av.avatar);

            setAvatars(avatarNumbers);

            console.log(avatarNumbers, 'avatarssss');
        } catch (error) {
            console.log(error)
        }
    }, []);




    const [toBeUpdatedName, setToBeUpdatedName] = useState<string>('');
    const [editedProfileName, setEditedProfileName] = useState<string>('');
    const [showEditProfileModal, setShowEditProfileModal] = useState<boolean>(false);

    const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

    const accType = Cookies.get('accType');
    console.log(accType)
    return (
        <>
            <div className="flex flex-col w-[65%]       max-md:w-[68%] max-xs:w-[86%]">

                <h1 id="main-heading-profiles" className="text-[35px] font-bold">Profiles</h1>
                <h4 id="sub-heading-1" className="font-semibold text-zinc-700">Parental Controls and Permissions</h4>


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


                <h4 id="sub-heading-2" className="font-semibold text-zinc-700 mt-6">Profile Settings</h4>
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

                    {accNames?.slice(1).map((accName, index: number) => {
                        return (
                            <div className="flex flex-col  border-t" key={accName} id={`profile-${index + 1}`}>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4 py-4">
                                        <div className="w-10 h-10 bg-blue-500 rounded-full">{avatars[index + 1] == null ? (
                                            <></>
                                        ) : (
                                            <Image alt='avatar' src={`/avatar${avatars[index + 1]}.png`} layout='omit' width={80} height={80} className='w-10 h-10 object-cover' />
                                        )}
                                        </div>
                                        <h2 className="text-[17px] font-sans font-semibold" onClick={() => console.log(avatars)}>{accName}</h2>
                                    </div>

                                    {accType !== accName && (
                                        <div className="text-white rounded overflow-hidden">
                                            <button onClick={() => {
                                                setToBeUpdatedName(accName);
                                                setShowEditProfileModal(true);
                                            }} 
                                            id="edit-profile-btn"
                                            className="bg-green-500 px-3 py-1 hover:bg-green-600 active:bg-green-400">Edit</button>
                                            <button id="del-profile-btn" onClick={() => handleDeleteProfile(accName)} className="bg-red-500 px-3 py-1 hover:bg-red-600 active:bg-red-400">delete</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    }
                    )}

                    {accNames?.length !== 5 && (
                        <>
                            <button id="add-profile-btn" onClick={() => setShowAddProfileModal(true)} className="bg-zinc-300 font-bold rounded w-full mx-auto h-12 hover:bg-zinc-400 active:bg-zinc-200 transition-colors">Add Profile</button>
                            <p className="mx-auto my-4 text-[#777]">Add up to 5 profiles for anyone who lives with you.</p>
                        </>
                    )}

                </div>

            </div>

            {showEditProfileModal &&
                <EditProfileModal
                    editedProfileName={editedProfileName}
                    handleEditProfile={handleEditProfile}
                    selectedAvatar={selectedAvatar}
                    setEditedProfileName={setEditedProfileName}
                    setSelectedAvatar={setSelectedAvatar}
                    setShowEditProfileModal={setShowEditProfileModal}
                />
            }
            {showAddProfileModal && (
                <AddProfileModal
                    handleCreateProfile={handleCreateProfile}
                    newProfileName={newProfileName}
                    selectedAvatar={selectedAvatar}
                    setNewProfileName={setNewProfileName}
                    setSelectedAvatar={setSelectedAvatar}
                    setShowAddProfileModal={setShowAddProfileModal}
                />
            )}
        </>
    )
}

export default MainContent;