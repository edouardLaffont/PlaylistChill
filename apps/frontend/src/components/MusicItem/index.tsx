import { Music } from '../../types/Music';

import default_cover from '../../assets/images/default_cover.svg'
import { useAppDispatch } from '../../store/store';
import { setCurrentMusic, setCurrentMusicList } from '../../slices/musicSlice';

type props = {
  music: Music,
  currentMusicList: Array<Music>
}

export default function MusicItem({ music, currentMusicList }: props) {
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(setCurrentMusic(music))
    dispatch(setCurrentMusicList(currentMusicList))
  }

  return (
    <div className='flex flex-col items-center cursor-pointer' onClick={handleClick}>
        <img src={default_cover} alt='cover' className='w-50 h-50 rounded-xl'/>
        <span className='text-white'>{music.title}</span>
        <span className='text-white-transparant-26 text-sm'>{music.artist}</span>
    </div>
  )
}
