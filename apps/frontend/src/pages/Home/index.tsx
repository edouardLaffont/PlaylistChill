import React from 'react';
import { Music } from '../../types/Music';

import { useAppDispatch, useAppSelector } from '../../store/store'

import MusicSection from '../../components/MusicSection';

export default function Home() {
  const kindList: Array<string> = ['rap', 'pop', 'classical',
    'electronicdancemusic', 'country', 'indierock',
    'hiphop', 'jazz', 'metal', 'oldies', 'rhythmblues',
    'rock', 'techno', 'kpop']

  const displaySection = kindList.map((kind: string) => { return <MusicSection key={kind} kind={kind} /> })

  return (
    <div className="">
      {
        localStorage.getItem('recentlyPlayed') ?
          <MusicSection kind={'recently played'} /> : <></>
      }
      {displaySection}
    </div>
  );
}
