import React from 'react';

import { Music } from '../../types/Music';

import default_cover from '../../assets/images/default_cover.svg'
import { useAppDispatch } from '../../store/store';
import { setCurrentMusic } from '../../slices/musicSlice';

type props = {
  music: Music
}

export default function MusicItem({ music }: props) {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(setCurrentMusic(music))
  }

  return (
    <div className='flex flex-col items-center cursor-pointer' onClick={handleClick}>
        <img src={default_cover} alt='cover' className='w-50 h-50 rounded-xl'/>
        <span className='text-white'>{music.title}</span>
        <span className='text-white-transparant-26 text-sm'>{music.artist}</span>
    </div>
  )
}
