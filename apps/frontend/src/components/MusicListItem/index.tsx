import { Music } from "../../types/Music"
import default_cover from "../../assets/images/default_cover.svg"

import { useAppDispatch } from "../../store/store"
import { setCurrentMusic, setCurrentMusicList } from "../../slices/musicSlice"

type props = {
  music: Music
  currentMusicList: Array<Music>
}

export default function MusicListItem({ music, currentMusicList }: props) {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(setCurrentMusic(music))
    dispatch(setCurrentMusicList(currentMusicList))
  }

  return (
    <tr className="border-y border-white-transparant-19 cursor-pointer" onClick={handleClick}>
      <img src={default_cover} alt="cover" className="w-14 h-14 my-1 ml-1" />
      <td>{music.title}</td>
      <td>{music.artist}</td>
    </tr>
  )
}