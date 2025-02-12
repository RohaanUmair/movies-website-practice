import Header from "@/components/home-page/Header";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/profile-page/Sidebar";
import MainContent from "@/components/profile-page/MainContent";


function page() {
    return (
        <div className='w-full min-h-screen bg-zinc-100'>
            <Header />

            <div className="flex px-12 pt-6         max-md:justify-between max-md:px-6">
                <Sidebar />
                <MainContent />
            </div>
            <Toaster />
        </div>
    )
}

export default page;