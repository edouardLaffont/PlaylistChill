import React from 'react';

import { Music } from '../../types/Music';

import default_cover from '../../assets/images/default_cover.svg'

type props = {
  music: Music
}

export default function MusicItem({ music }: props) {
  return (
    <div className='flex flex-col items-center cursor-pointer' onClick={() => {}}>
        <img src={default_cover} alt='cover' className='w-40 h-40 rounded-xl'/>
        <span className='text-white'>{music.title}</span>
    </div>
  )
}
