import { useState, useRef, useEffect } from 'react'

import ReactPlayer from "react-player"

import { Music } from '../../../types/Music'

import default_cover from '../../../assets/images/default_cover.svg'
import play_icon from '../../../assets/icons/play_icon.png'
import pause_icon from '../../../assets/icons/pause_icon.png'
import next_icon from '../../../assets/icons/next_icon.png'
import heart_icon from '../../../assets/icons/heart_icon.png'
import heart_filled_icon from '../../../assets/icons/heart_filled_icon.svg'
import Slider from '@mui/material/Slider';

import { useAppSelector, useAppDispatch } from '../../../store/store'
import { setCurrentMusic, handleNext, handlePrevious } from '../../../slices/musicSlice'
import { addLike, getUser } from '../../../data/musicApi'
import { User } from '../../../types/User'
import { setUserTracks } from '../../../slices/authSlice'

export default function Player() {
    const dispatch = useAppDispatch()
    const { musics, currentMusic } = useAppSelector((store) => store.music)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [timer, setTimer] = useState(0)
    const [timerAsc, setTimerAsc] = useState(0)
    const [duration, setDuration] = useState(0)
    const [likedMusic, setLikedMusic] = useState(false)
   /*  const [likedTrack, setLikedTrack] = useState("") */
    const player = useRef<ReactPlayer | any>(null)
    const { user } = useAppSelector((store) => store.auth) 

    const handlePlaying = () => {
        setIsPlaying(!isPlaying)
    }

    const handleProgress = (event: Event, value: number | number[]) => {
        const time = (value as number) / 100
        setProgress(time)
        player.current.seekTo(time)
    }
    const handleDuration = (duration: number) => {
        setDuration(duration)
    }

    // Ajoute un like à la currentMusic
    const handleLike = (idUser: number, idTrack: number) => {
        addLike(idUser, idTrack)
        setLikedMusic(!likedMusic)
        console.log(currentMusic?.id)
        getUser(user.id).then(response => dispatch(setUserTracks(response.tracks))) 
        
    }

    // Pour comparer les likes de l'utilisateur et la cuurentMusic.id ?
    useEffect(() => {
        getUser(user.id)
            .then(response => {
                setLikedMusic(response.tracks.filter((track: Music) => {
                    return track.id === currentMusic?.id
                }).length)
            })
    }, [currentMusic])

    const convertSecondesToMinutes = (secondes: number): string => {
        const minutes: string = Math.floor(secondes / 60).toString()
        let newSecondes: string = Math.round(secondes % 60).toString()
        if (parseInt(newSecondes) < 10) {
            newSecondes = '0' + parseInt(newSecondes)
        } else if (!parseInt(newSecondes)) {
            newSecondes = '00'
        }
        return `${minutes}:${newSecondes}`
    }


    return (
        <div className="flex w-full bg-white-transparant-19 absolute bottom-0 left-0 h-28 items-center">
            <div className='flex items-center w-2/6'>
                <img src={default_cover} alt='album cover' className='h-24 w-24 ml-2 mr-5' />
                <div className='flex flex-col text-white'>
                    <span className=' text-xl'>{currentMusic?.title}</span>
                    <span>{currentMusic?.artist}</span>
                </div>
                <img src={likedMusic ? heart_filled_icon : heart_icon} alt='like button' className='h-5 w-5 ml-3' onClick={() => handleLike(user.id, currentMusic?.id)} />
            </div>
            <div className='w-4/6 flex flex-col justify-center items-center'>
                <div className='flex space-x-8'>
                    <img src={next_icon} alt='previous button' className='h-8 w-8 rotate-180 cursor-pointer' onClick={() => dispatch(handlePrevious())} />
                    <img src={isPlaying ? pause_icon : play_icon} onClick={handlePlaying} alt='play/pause button' className='h-10 w-10 cursor-pointer' />
                    <img src={next_icon} alt='next button' className='h-8 w-8 cursor-pointer' onClick={() => dispatch(handleNext())} />
                </div>
                <div className='flex w-5/6 items-center'>
                    <span className='text-white mr-3'>{convertSecondesToMinutes(timer)}</span>
                    <Slider value={progress * 100} size='small' onChange={handleProgress} color='secondary' />
                    <span className='text-white ml-3'>{convertSecondesToMinutes(timerAsc)}</span>
                </div>
            </div>
            <div className='w-2/6' />
            <ReactPlayer
                ref={player}
                url={currentMusic?.link}
                playing={isPlaying}
                onEnded={() => dispatch(handleNext())}
                onProgress={(event) => {
                    setProgress(event.played)
                    setTimerAsc(duration - event.playedSeconds)
                    setTimer(event.playedSeconds)
                }}
                onDuration={handleDuration}
                style={
                    {
                        visibility: 'hidden',
                        position: 'absolute',
                        top: -1000
                    }
                }
            />
        </div>
    )
}
