import React, { useEffect, useState } from 'react';

import MusicList from '../../components/MusicList';

import { getSuggestions } from '../../data/musicApi';
import { useAppSelector } from '../../store/store';

import { Music } from '../../types/Music';

export default function Suggestions() {
    const { user } = useAppSelector(store => store.auth)
    const { musics } = useAppSelector(store => store.music)
    const  [suggestionMusics, setSuggestionMusics] = useState<Array<Music>>([])

    useEffect(() => {
        getSuggestions(user.id)
            .then(response => {
                if(response.length) {
                    setSuggestionMusics(response)
                } else {
                    const randomMusics: Array<Music> = []
                    let newRandomMusic: Music
                    while (randomMusics.length < 8) {
                        newRandomMusic = musics[Math.floor(Math.random()*musics.length)]
                        if(!randomMusics.includes(newRandomMusic)){
                            randomMusics.push(newRandomMusic)
                        }
                    }
                    setSuggestionMusics(randomMusics)
                }
                
            })
    }, [])

    return (
        <div className="px-10 py-3">
            <h1 className='text-5xl text-white mb-5'>Suggestions</h1>
            <div>
                <MusicList musics={suggestionMusics} />
            </div>
        </div>
    );
}
