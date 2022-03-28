import React, { useState } from 'react';

import cover from '../../../assets/images/La_bohème_album.png'
import play_icon from '../../../assets/icons/play_icon.png'
import pause_icon from '../../../assets/icons/pause_icon.png'
import next_icon from '../../../assets/icons/next_icon.png'

export default function Player() {
    const [isPlaying, setIsPlaying] = useState(false)

    const handlePlaying = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <div className="flex w-full bg-white-transparant-19 absolute bottom-0 left-0 h-28 items-center">
            <div className='flex items-center w-1/6'>
                <img src={cover} alt='album cover' className='h-24 w-24 ml-2 mr-5' />
                <div className='flex flex-col text-white'>
                    <span className=' text-xl'>La boème</span>
                    <span>Charles Aznavour</span>
                </div>
            </div>
            <div className='w-5/6 flex justify-center'>
                <div className='flex space-x-8'>
                    <button>
                        <img src={next_icon} alt='previous button' className='h-10 w-10 rotate-180' />
                    </button>
                    <button>
                        <img src={isPlaying? pause_icon : play_icon} onClick={handlePlaying} alt='play/pause button' className='h-10 w-10' />
                    </button>
                    <button>
                        <img src={next_icon} alt='next button' className='h-10 w-10' />
                    </button>
                </div>
            </div>
        </div>
    )
}
