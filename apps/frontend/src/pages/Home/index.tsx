import React, { useEffect } from 'react';
import { getTracks } from '../../data/musicApi';
import { getMusics } from '../../slices/musicSlice';
import { Music } from '../../types/Music';

import { useAppDispatch, useAppSelector} from '../../store/store'
import MusicItem from '../../components/MusicItem';

export default function Home() {
  const dispatch = useAppDispatch()
  const { musics } = useAppSelector((store) => store.music)

  useEffect(() => {
    getTracks()
      .then((tracks: Array<Music>) => dispatch(getMusics(tracks)))
  }, [])

  const displayMusic = musics.map((music: Music) => <MusicItem music={music} />)

  return (
    <div className="grid grid-cols-6">
      {displayMusic}
    </div>
  );
}
