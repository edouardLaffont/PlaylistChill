import { Music } from "../../types/Music"
import MusicListItem from "../MusicListItem"

type props = {
    musics: Array<Music>
}

export default function MusicList({ musics }: props) {

    const displayMusics = musics.map((music: Music) => { return <MusicListItem key={music.id} music={music} currentMusicList={musics}/> })

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
