import { useEffect, useState } from "react"
import { Music } from "../../types/Music"

import MusicItem from "../MusicItem"

import { getTracksByKind } from "../../data/musicApi"
import { useAppSelector } from "../../store/store"

type props = {
    kind: string
}

export default function MusicSection({ kind }: props) {
    const { search } = useAppSelector(store => store.music)
    const [musics, setMusics] = useState<Array<Music>>()

    useEffect(() => {
        if (kind !== 'recently played') {
            getTracksByKind(kind)
                .then(response => setMusics(response))
        } else {
            setMusics(JSON.parse(localStorage.getItem('recentlyPlayed') as string))
        }

    }, [])

    const displayMusic =
        musics?.filter((music: Music) => {
            return music.artist.toLowerCase().includes(search.toLowerCase())
                || music.title.toLowerCase().includes(search.toLowerCase())
                || kind.toLowerCase().includes(search.toLowerCase())
        })
            .map((music: Music) => <MusicItem key={music.id} music={music} currentMusicList={musics} />)

    return (
        <div className="w-full text-white">
            {displayMusic?.length ?
                <>
                    <h2 className="ml-6 text-3xl mt-5">{kind.charAt(0).toUpperCase() + kind.slice(1)}</h2>
                    <div className="w-full grid grid-cols-5 gap-y-5 pt-5">
                        {displayMusic}
                    </div>
                </> : <></>
            }
        </div>
    )
}
