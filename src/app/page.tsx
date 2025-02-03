'use client';
import Header from "@/components/home-page/Header";
import Modal from "@/components/home-page/Modal";
import MovieOverviewSec from "@/components/home-page/MovieOverviewSec";
import SelectUser from "@/components/home-page/SelectUser";
import { useState } from "react";


export default function Home() {
  const [selectUser, setSelectUser] = useState<boolean>(true);

  const [showModal, setShowModal] = useState<boolean>(false);

  // if (selectUser) return <SelectUser setSelectUser={setSelectUser} />

  return (
    <div className={`relative min-h-screen bg-zinc-950 ${showModal && 'overflow-hidden h-screen'}`}>
      <Header />
      <MovieOverviewSec setShowModal={setShowModal} />

      {
        showModal && <Modal setShowModal={setShowModal} />
      }
    </div>
  );
};