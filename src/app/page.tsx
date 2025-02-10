'use client';
import Header from "@/components/home-page/Header";
import Modal from "@/components/home-page/Modal";
import MovieOverviewSec from "@/components/home-page/MovieOverviewSec";
import SelectUser from "@/components/home-page/SelectUser";
import { AppDispatch, RootState } from "@/states/store";
import { setUserAccType, setUserEmail, setUsername } from "@/states/user/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { setApiData, setLikedMovies } from "@/states/movies/moviesSlice";
import axios from "axios";



export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [modalDetails, setModalDetails] = useState<{
    movieName: string;
    movieDesc: string;
  }>({ movieName: '', movieDesc: '' });

  const dispatch = useDispatch<AppDispatch>();

  const accType = useSelector((state: RootState) => state.user.userAccType);

  useEffect(() => {
    const username = Cookies.get('user');
    dispatch(setUsername(username));

    const email = Cookies.get('userEmail');
    dispatch(setUserEmail(email));

    const accType = Cookies.get('accType');
    dispatch(setUserAccType(accType));

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmJjMDM5N2MyN2RkYjJmM2U4ODI4N2U1NTU5NTUyMSIsIm5iZiI6MTczODU4MDE1MC43OTAwMDAyLCJzdWIiOiI2N2EwYTBiNmU5OWRmMjNhOWYyNjc1MjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dG7wxvB4UCX128gdM4dJ6eO84r0DNYe0jzuk3orNCvQ'
      }
    };

    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(res => res.json())
      .then(res => dispatch(setApiData(res.results)))
      .catch(err => console.error(err));
  }, [dispatch]);

  useEffect(() => {
    const email = Cookies.get('userEmail');
    dispatch(setUserEmail(email));

    const accType = Cookies.get('accType');
    dispatch(setUserAccType(accType));

    if (!accType || !email) return;

    axios.get('/api/like-movie', {
      params: { email, accType }
    })
      .then((data) => {
        console.log(data)
        console.log(email, accType)
        const a = data.data.data.likedMoviesArr;

        if (!a) return;
        dispatch(setLikedMovies(a))
        console.log(a)
      })
  }, [accType])


  // if (selectUser) return <SelectUser setSelectUser={setSelectUser} />
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