import Link from "next/link";
import { GoCreditCard, GoShieldCheck } from "react-icons/go";
import { HiMiniUsers } from "react-icons/hi2";
import { IoIosArrowRoundBack } from "react-icons/io";
import { PiDevicesBold, PiHouseBold } from "react-icons/pi";

function Sidebar() {
    const liStyles = "flex items-center cursor-pointer gap-2 font-sans font-bold text-zinc-600";

    return (
        <div id="profile-sidebar" className="flex flex-col gap-10 w-[29%]        max-xs:w-fit">

            <Link href={'/'}>
                <button id="back-to-movies-btn" className="flex items-center text-sm font-semibold gap-2 hover:underline        max-xs:hidden"><IoIosArrowRoundBack className="text-3xl" /> Back to Movies</button>
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
    )
}

export default Sidebar;