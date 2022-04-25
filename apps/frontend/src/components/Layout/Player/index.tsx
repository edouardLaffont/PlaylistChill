import React, { useState, useRef, useEffect } from 'react'

import ReactPlayer from "react-player"

import { getTracks } from '../../../data/musicApi'

import{ Music } from '../../../types/Music'

import default_cover from '../../../assets/images/default_cover.svg'
import play_icon from '../../../assets/icons/play_icon.png'
import pause_icon from '../../../assets/icons/pause_icon.png'
import next_icon from '../../../assets/icons/next_icon.png'
import Slider from '@mui/material/Slider';

import { useAppSelector, useAppDispatch} from '../../../store/store'
import { getMusics } from '../../../slices/musicSlice'

export default function Player() {
    const dispatch = useAppDispatch()
    const { musics } = useAppSelector((store) => store.music)
    const [currentMusic, setCurrentMusic] = useState<Music>(musics[0])
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress]  = useState(0)
    const [timer, setTimer] = useState(0)
    const player = useRef<ReactPlayer | any>(null)

    useEffect(() => {
        setCurrentMusic(musics[0])
    }, [musics])

    const handlePlaying = () => {
        setIsPlaying(!isPlaying)
    }

    const handleProgress = (event: Event, value: number | number[]) => {
        const time = (value as number)/100
        setProgress(time)
        player.current.seekTo(time)
    }

    const handlePrevious = () => {
        const index: number = musics.map((music: Music) => { return music.link; }).indexOf(currentMusic?.link as string) - 1;
        if(index >= 0) {
            setCurrentMusic(musics[index])
        } else {
            setCurrentMusic(musics[musics.length - 1])
        }
    }

    const handleNext = () => {
        const index: number = musics.map((music: Music) => { return music.link; }).indexOf(currentMusic?.link as string) + 1;
        if(index <= musics.length - 1) {
            setCurrentMusic(musics[index])
        } else {
            setCurrentMusic(musics[0])
        }
    }

    return (
        <div className="flex w-full bg-white-transparant-19 absolute bottom-0 left-0 h-28 items-center">
            <div className='flex items-center w-1/6'>
                <img src={default_cover} alt='album cover' className='h-24 w-24 ml-2 mr-5' />
                <div className='flex flex-col text-white'>
                    <span className=' text-xl'>{currentMusic?.title}</span>
                    <span>{currentMusic?.artist}</span>
                </div>
            </div>
            <div className='w-5/6 flex flex-col justify-center items-center'>
                <div className='flex space-x-8'>
                    <button>
                        <img src={next_icon} alt='previous button' className='h-8 w-8 rotate-180' onClick={handlePrevious}/>
                    </button>
                    <button>
                        <img src={isPlaying? pause_icon : play_icon} onClick={handlePlaying} alt='play/pause button' className='h-10 w-10' />
                    </button>
                    <button>
                        <img src={next_icon} alt='next button' className='h-8 w-8' onClick={handleNext}/>
                    </button>
                </div>
                <div className='w-1/2'>
                    <Slider value={progress*100} size='small' onChange={handleProgress} color='secondary'/>
                </div>
            </div>
            <ReactPlayer 
                ref={player}
                url={currentMusic?.link}
                playing={isPlaying}
                onEnded={handleNext}
                onProgress={(event) => {
                    setProgress(event.played)
                    setTimer(event.playedSeconds)
                }}
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
