import React, { useEffect, useState } from 'react';

import SearchBar from '../../SearchBar';
import profile_icon from '../../../assets/icons/profile_icon.png'

import { setMusics } from '../../../slices/musicSlice'
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { Music } from '../../../types/Music';
import { getTracks } from '../../../data/musicApi';

export default function TopBar() {
    const dispatch = useAppDispatch()
    const [initialMusics, setInitialMusics] = useState<Array<Music>>()

    useEffect(() => {
        getTracks()
            .then((response: Array<Music>) => setInitialMusics(response))
    }, [])

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        dispatch(
            setMusics(initialMusics?.filter((music: Music) => {
                return music.artist.includes(search) || music.title.includes(search)
            }))
        )
    }

    return (
        <div className='flex bg-blue-dark-lighter h-16 w-full justify-between px-5 items-center'>
            <SearchBar placeholder='Search...' onChange={handleOnChange}/>
            <img src={profile_icon} alt='profile icon' className='w-14 h-14'/>
        </div>
    )
}
