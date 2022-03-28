import React from 'react';

import SearchBar from '../../SearchBar';
import profile_icon from '../../../assets/icons/profile_icon.png'
export default function TopBar() {
    return (
        <div className='flex bg-blue-dark-lighter h-16 w-full justify-between px-5 items-center'>
            <SearchBar placeholder='Search...'/>
            <img src={profile_icon} alt='profile icon' className='w-14 h-14'/>
        </div>
    )
}
