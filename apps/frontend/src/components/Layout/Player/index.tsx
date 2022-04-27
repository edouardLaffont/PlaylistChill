import React, { useState, useRef, useEffect } from 'react'

import ReactPlayer from "react-player"

import { Music } from '../../../types/Music'

import default_cover from '../../../assets/images/default_cover.svg'
import play_icon from '../../../assets/icons/play_icon.png'
import pause_icon from '../../../assets/icons/pause_icon.png'
import next_icon from '../../../assets/icons/next_icon.png'
import heart_icon from '../../../assets/icons/heart_icon.png'
import heart_filled_icon from '../../../assets/icons/heart_filled_icon.png'
import Slider from '@mui/material/Slider';

import { useAppSelector, useAppDispatch } from '../../../store/store'
import { setCurrentMusic, handleNext, handlePrevious } from '../../../slices/musicSlice'
import { addLike, getUser } from '../../../data/musicApi'
import { User } from '../../../types/User'

export default function Player() {
    const dispatch = useAppDispatch()
    const { musics, currentMusic } = useAppSelector((store) => store.music)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [timer, setTimer] = useState(0)
    const [timerAsc, setTimerAsc] = useState(0)
    const [duration, setDuration] = useState(0)
    const [likedMusic, setLikedMusic] = useState(false)
    const player = useRef<ReactPlayer | any>(null)

    const lastMusicId = localStorage.getItem('lastMusic')

    useEffect(() => {
        if (lastMusicId) {
            dispatch(setCurrentMusic(musics.find((music: Music) => { return music.id === parseInt(lastMusicId) })))
        } else {
            dispatch(setCurrentMusic(musics[0]))
        }
    }, [musics])

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
    }

    // Pour comparer les likes de l'utilisateur et la cuurentMusic.id ?
    useEffect(() => {
        getUser(3)
          .then((user: User) => console.log(user.tracks.filter((track: Music)=>{
            return track.id === currentMusic?.id
            })))
      }, [])

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
            <div className='flex items-center w-1/6'>
                <img src={default_cover} alt='album cover' className='h-24 w-24 ml-2 mr-5' />
                <div className='flex flex-col text-white'>
                    <span className=' text-xl'>{currentMusic?.title}</span>
                    <span>{currentMusic?.artist}</span>
                    <button>
                        <img src={likedMusic ? heart_filled_icon : heart_icon} alt='like button' className='h-8 w-8' onClick={() => {handleLike(3, currentMusic?.id)}} />
                    </button>
                </div>
            </div>
            <div className='w-5/6 flex flex-col justify-center items-center'>
                <div className='flex space-x-8'>
                    <button>
                        <img src={next_icon} alt='previous button' className='h-8 w-8 rotate-180' onClick={() => dispatch(handlePrevious())} />
                    </button>
                    <button>
                        <img src={isPlaying ? pause_icon : play_icon} onClick={handlePlaying} alt='play/pause button' className='h-10 w-10' />
                    </button>
                    <button>
                        <img src={next_icon} alt='next button' className='h-8 w-8' onClick={() => dispatch(handleNext())} />
                    </button>
                </div>
                <div className='flex w-1/2 items-center'>
                    <span className='text-white mr-3'>{convertSecondesToMinutes(timer)}</span>
                    <Slider value={progress * 100} size='small' onChange={handleProgress} color='secondary' />
                    <span className='text-white ml-3'>{convertSecondesToMinutes(timerAsc)}</span>
                </div>
            </div>
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
