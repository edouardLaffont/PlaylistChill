import { useAppSelector } from "../../store/store"
import { Music } from "../../types/Music"
import MusicListItem from "../MusicListItem"

type props = {
    musics: Array<Music>
}

export default function MusicList({ musics }: props) {
    const { search } = useAppSelector(store => store.music)
    const displayMusics =
        musics?.filter((music: Music) => {
            return music.artist.toLowerCase().includes(search.toLowerCase())
                || music.title.toLowerCase().includes(search.toLowerCase())
        })
            .map((music: Music) => <MusicListItem key={music.id} music={music} currentMusicList={musics} />)
            
    return (
        <table className="w-full text-white">
            <thead className=" border-b border-white-transparant-19">
                <tr className="text-left text-xl">
                    <th></th>
                    <th>Title</th>
                    <th>Artist</th>
                </tr>
            </thead>
            <tbody>
                {displayMusics}
            </tbody>
        </table>
    )
}
