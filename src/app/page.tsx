'use client';
import SelectUser from "@/components/home-page/SelectUser";
import { useState } from "react";

export default function Home() {
  const [selectUser, setSelectUser] = useState<boolean>(true);

  if (selectUser) return <SelectUser setSelectUser={setSelectUser} />

  return (
    <header className='h-20 bg-black flex items-center px-16'>
      <h1 className='z-10 text-[#ff0000] text-5xl font-semibold'>Movies</h1>

      <div>

        <ul className="flex gap-6 text-white text-lg font-semibold">
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
        </ul>

        <div>
          
        </div>

      </div>
    </header>
  );
};