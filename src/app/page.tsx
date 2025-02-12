'use client';
import Header from "@/components/home-page/Header";
import Modal from "@/components/home-page/Modal";
import MovieOverviewSec from "@/components/home-page/MovieOverviewSec";
import SelectUser from "@/components/home-page/SelectUser";
import { AppDispatch, RootState } from "@/states/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLikedMovies } from "@/states/movies/moviesSlice";
import axios from "axios";



export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [modalDetails, setModalDetails] = useState<{
    movieName: string;
    movieDesc: string;
  }>({ movieName: '', movieDesc: '' });

  const dispatch = useDispatch<AppDispatch>();

  const accType = useSelector((state: RootState) => state.user.userAccType);
  const email = useSelector((state: RootState) => state.user.userEmail);

  useEffect(() => {
    if (!accType || !email) return;

    axios.get('/api/like-movie', {
      params: { email, accType }
    })
      .then((data) => {
        console.log(data)
        console.log(email, accType)
        const a = data.data.data?.likedMoviesArr;

        if (!a) return;
        dispatch(setLikedMovies(a));
        console.log(a);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accType])


  if (!accType) return <SelectUser />

  return (
    <div className={`relative min-h-screen bg-zinc-950 ${showModal && 'overflow-hidden h-screen'}`}>
      <Header />
      <MovieOverviewSec setShowModal={setShowModal} setModalDetails={setModalDetails} />

      {
        showModal && <Modal modalDetails={modalDetails} setShowModal={setShowModal} />
      }
    </div>
  );
};