import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface Props {
    selectedAvatar: number | null;
    setSelectedAvatar: Dispatch<React.SetStateAction<number | null>>;
    newProfileName: string;
    setNewProfileName: Dispatch<SetStateAction<string>>;
    handleCreateProfile: () => Promise<void>;
    setShowAddProfileModal: Dispatch<SetStateAction<boolean>>;
}


function AddProfileModal({ selectedAvatar, setSelectedAvatar, newProfileName, setNewProfileName, handleCreateProfile, setShowAddProfileModal }: Props) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-md">
                <h2 className="text-white text-2xl mb-4">Select Avatar</h2>
                <div className="flex gap-4 mb-3">
                    <div id="add-profile-avatar1" className={`h-12 w-12 flex justify-center items-center border-blue-500 rounded-full ${selectedAvatar == 1 && ' border-2 '}`} onClick={() => setSelectedAvatar(1)}>
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

                    <div id="add-profile-avatar3" className={`h-12 w-12 flex justify-center items-center border-blue-500 rounded-full ${selectedAvatar == 3 && ' border-2 '}`} onClick={() => setSelectedAvatar(3)}>
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
                <h2 className="text-white text-2xl mb-4">Add New Profile</h2>
                <input
                    id="add-profile-inp"
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
                        id="create-profile-btn"
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
    )
}

export default AddProfileModal;