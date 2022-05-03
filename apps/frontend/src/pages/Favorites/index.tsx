import React, { useEffect } from 'react';

import MusicList from '../../components/MusicList';
import { getUser } from '../../data/musicApi';
import { setUserTracks } from '../../slices/authSlice';

import { useAppDispatch, useAppSelector } from '../../store/store';

export default function Favorites() {
    const { user } = useAppSelector(store => store.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        getUser(user.id).then(response => dispatch(setUserTracks(response.tracks))) 
    }, [])


    return (
        <div className="px-10 py-3">
            <h1 className='text-5xl text-white mb-5'>Your favorites songs</h1>
            <div>
                {user.tracks.length?
                    <MusicList musics={user.tracks} /> :
                    <p className='text-xl text-white'>You haven't liked any music yet</p>
                }
                
            </div>
        </div>
    );
}
