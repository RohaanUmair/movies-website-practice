import { addDislikedMovie, addLikedMovie } from '@/states/movies/moviesSlice';
import { RootState } from '@/states/store';
import axios from 'axios';
import { useRef, useState, useEffect, Dispatch, SetStateAction } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { GrMultiple } from 'react-icons/gr';
import { HiMiniHandThumbDown, HiMiniHandThumbUp } from 'react-icons/hi2';
import { IoIosClose } from 'react-icons/io';
import { MdForward10, MdReplay10, MdVoiceChat } from 'react-icons/md';
import { SlLock, SlLockOpen } from 'react-icons/sl';
import { TbBrandSpeedtest, TbPlayerSkipForwardFilled } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';

const VideoPlayer = ({ src, setShowVideoPlayer, playerMovieName }: { src: string, setShowVideoPlayer: Dispatch<SetStateAction<boolean>>, playerMovieName: string }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const intervalRef = useRef<any>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [showSpeedSelect, setShowSpeedSelect] = useState<boolean>(false);
    const [lockedMode, setLockedMode] = useState<boolean>(false);
    const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

    const updateProgress = () => {
        if (videoRef.current) {
            const value =
                (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(value);
        }
    };

    const handleSpeedChange = (e) => {
        const speed = parseFloat(e.target.value);
        setPlaybackSpeed(speed);
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
        }
    };


    useEffect(() => {
        const video = videoRef.current;

        const handleVideoEnd = () => {
            setIsPlaying(false);
            setProgress(0);
            stopProgressLoop();
        };

        if (video) {
            video.addEventListener('ended', handleVideoEnd);
        }

        return () => {
            if (video) {
                video.removeEventListener('ended', handleVideoEnd);
            }
            stopProgressLoop();
        };
    }, []);

    const startProgressLoop = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            updateProgress();
        }, 1000);
    };

    const stopProgressLoop = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
                startProgressLoop();
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
                stopProgressLoop();
            }
        }
    };

    const handleSeek = (event) => {
        if (videoRef.current?.duration) {
            const seekTo = (event.target.value / 100) * videoRef.current.duration;
            videoRef.current.currentTime = seekTo;
            setProgress(event.target.value);
        }
    };

    const handleForward = () => {
        if (!videoRef.current?.currentTime) return;
        videoRef.current.currentTime += 10;
        setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }

    const handleRewind = () => {
        if (!videoRef.current?.currentTime) return;
        videoRef.current.currentTime -= 10;
        setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }

    const toggleMute = () => {
        if (!videoRef.current?.currentTime) return;
        const currentVolume = videoRef.current.volume;
        if (currentVolume > 0) {
            videoRef.current.volume = 0;
            setVolume(0);
            setIsMuted(true);
        } else {
            videoRef.current.volume = 1;
            setVolume(1);
            setIsMuted(false);
        }
    };

    const handleVolumeChange = (event) => {
        if (!videoRef.current?.currentTime) return;
        const newVolume = event.target.value;
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };


    const time = (videoRef.current?.duration as number) - (videoRef.current?.currentTime as number);
    const timeMins = Math.floor(time / 60);
    const timeSecs = Math.floor(time % 60);


    const dispatch = useDispatch();
    const likedMoviesArr = useSelector((state: RootState) => state.movies.likedMovies);
    const email = useSelector((state: RootState) => state.user.userEmail)
    const dislikedMoviesArr = useSelector((state: RootState) => state.movies.disLikedMovies);



    const handleLikeMovie = async (title: string) => {
        dispatch(addLikedMovie(title));
        toast.success('Saved to Liked Movies');
    }

    const handleDislikeMovie = async (title: string) => {
        dispatch(addDislikedMovie(title));
        toast.success('Saved to Disliked Movies');
    }

    const accType = useSelector((state: RootState) => state.user.userAccType);

    async function abcd() {
        await axios.put('/api/like-movie', { email, accType, likedMoviesArr })
    }

    useEffect(() => {
        abcd();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [likedMoviesArr]);


    async function abcde() {
        await axios.put('/api/dislike-movie', { email, accType, dislikedMoviesArr })
    }

    useEffect(() => {
        abcde();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dislikedMoviesArr]);


    const [isIdle, setIsIdle] = useState<boolean>(false);

    useEffect(() => {
        let timeout = setTimeout(() => setIsIdle(true), 2000);

        const handleMouseMove = () => {
            setIsIdle(false);
            clearTimeout(timeout);
            timeout = setTimeout(() => setIsIdle(true), 2000);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);


    return (
        <div className={`w-full h-screen fixed inset-0 z-[9999999] bg-black ${isIdle && 'cursor-none'}`}>
            {!isIdle && (
                !lockedMode && (
                    <>
                        <div className='absolute top-10 flex left-1/2 gap-3 -translate-x-1/2 z-[99999999999]'>
                            <div className='border rounded-full w-14 h-14 flex cursor-pointer justify-center items-center text-white bg-zinc-800 text-[39px]'>
                                <GoPlus />
                            </div>

                            <div
                                className='border rounded-full w-14 h-14 flex cursor-pointer justify-center items-center text-white bg-zinc-800 text-3xl hover:scale-110 z-[9999999999]'
                                onClick={() => {
                                    handleDislikeMovie(playerMovieName);
                                }}
                            >
                                <HiMiniHandThumbDown />
                            </div>

                            <div
                                className='border rounded-full w-14 h-14 flex cursor-pointer justify-center items-center text-white bg-zinc-800 text-3xl hover:scale-110 z-[99999999999]'
                                onClick={() => {
                                    handleLikeMovie(playerMovieName);
                                }}
                            >
                                <HiMiniHandThumbUp />
                            </div>
                        </div>

                        <div className='flex absolute items-center top-5 left-20'>
                            <h1 className='text-5xl font-bold text-red-600'>N</h1>
                            <h2 className='text-white font-semibold'>{playerMovieName}</h2>
                        </div>

                        <IoIosClose onClick={() => setShowVideoPlayer(false)} className='absolute z-[99999999999] right-0 text-white text-5xl hover:bg-zinc-700 rounded-full cursor-pointer top-0 active:bg-zinc-500' />

                        <div className='absolute top-1/2 left-1/2 z-[99999999999] text-white text-6xl -translate-x-1/2 -translate-y-1/2 flex justify-evenly w-full'>
                            <MdReplay10 onClick={handleRewind} className='text-8xl cursor-pointer' />

                            <button onClick={togglePlayPause}>
                                {isPlaying ? <FaPause /> : <FaPlay />}
                            </button>

                            <MdForward10 onClick={handleForward} className='text-8xl cursor-pointer' />
                        </div>

                        <div className='flex flex-col items-center gap-32 absolute left-10 bottom-1/2'>
                            <button onClick={toggleMute} className='text-white text-5xl'>
                                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                            </button>
                            <input
                                className='accent-white -rotate-90 z-[9999999999] h-full w-52'
                                type='range'
                                min='0'
                                max='1'
                                step='0.05'
                                value={volume}
                                onChange={handleVolumeChange}
                            />
                        </div>
                    </>
                )

            )}

            <video
                className={`video-player w-full h-full`}
                ref={videoRef}
                src={src}
                onClick={togglePlayPause}
                onPlay={startProgressLoop}
                onPause={stopProgressLoop}
            />


            {!isIdle && (
                <div className={`text-white flex flex-col justify-center absolute bottom-0 h-24 gap-2 w-full px-8 ${lockedMode && 'h-32 !bg-transparent'}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                    {lockedMode ? (
                        <div className='flex justify-center flex-col items-center cursor-pointer' onClick={() => setLockedMode(false)}>
                            <div className='h-11 w-11 text-2xl bg-white rounded-full text-black flex justify-center items-center'>
                                <SlLock />
                            </div>

                            <div className='flex flex-col items-center'>
                                <h5 className='font-semibold'>Screen Locked</h5>
                                <p className='text-sm '>Tap to Unlock</p>
                            </div>
                        </div>
                    ) : (
                        showSpeedSelect ? (
                            <div className='flex flex-col items-center w-full gap-2'>
                                <input
                                    className="accent-zinc-400 outline-none w-1/2 h-2"
                                    type="range"
                                    min="0.5"
                                    max="1.5"
                                    value={playbackSpeed}
                                    step="0.25"
                                    onChange={handleSpeedChange}
                                />

                                <ul className="flex w-1/2 justify-between">
                                    <li>0.5x</li>
                                    <li>0.75x</li>
                                    <li>1x</li>
                                    <li>1.25x</li>
                                    <li>1.5x</li>
                                </ul>


                                <IoIosClose onClick={() => setShowSpeedSelect(false)} className='absolute right-52 text-5xl hover:bg-zinc-700 rounded-full cursor-pointer top-0 active:bg-zinc-500' />
                            </div>
                        ) : (
                            <>
                                <input
                                    className='accent-red-600 outline-none h-[6px] border-none opacity-85'
                                    type='range'
                                    min='0'
                                    max='100'
                                    value={progress}
                                    onChange={handleSeek}
                                    step={0.01}
                                />

                                <p className='text-sm font-sans'>{`${timeMins.toString().padStart(2, '0')}:${timeSecs.toString().padStart(2, '0')}`}</p>

                                <div className='flex justify-center'>
                                    <div className='flex gap-5 font-semibold'>
                                        <div className='flex items-center text-sm gap-1 hover:bg-zinc-700 p-1 cursor-pointer' onClick={() => setShowSpeedSelect(true)}>
                                            <TbBrandSpeedtest className='text-2xl' />
                                            <h4>Speed ( {playbackSpeed}x )</h4>
                                        </div>

                                        <div onClick={() => setLockedMode(true)} className='flex items-center text-sm gap-1 hover:bg-zinc-700 p-1 cursor-pointer'>
                                            <SlLockOpen className='text-2xl' />
                                            <h4>Lock</h4>
                                        </div>

                                        <div className='flex items-center text-sm gap-1 hover:bg-zinc-700 p-1 cursor-pointer'>
                                            <GrMultiple className='text-2xl' />
                                            <h4>Episodes</h4>
                                        </div>

                                        <div className='flex items-center text-sm gap-1 hover:bg-zinc-700 p-1 cursor-pointer'>
                                            <MdVoiceChat className='text-2xl' />
                                            <h4>Audio and Subtitles</h4>
                                        </div>

                                        <div className='flex items-center text-sm gap-1 hover:bg-zinc-700 p-1 cursor-pointer'>
                                            <TbPlayerSkipForwardFilled className='text-2xl' />
                                            <h4>Next Ep.</h4>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    )}
                </div>
            )}

            <Toaster />
        </div>
    );
};

export default VideoPlayer;