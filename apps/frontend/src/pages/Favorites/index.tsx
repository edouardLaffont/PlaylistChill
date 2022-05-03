import React, { useState } from 'react';

import MusicList from '../../components/MusicList';
import { Music } from '../../types/Music';

export default function Favorites() {
    const  [musics, setMusics] = useState<Array<Music>>([])

    return (
        <div className="px-10 py-3">
            <h1 className='text-5xl text-white mb-5'>Your favorites songs</h1>
            <div>
                <MusicList musics={musics} />
            </div>
        </div>
    );
}
