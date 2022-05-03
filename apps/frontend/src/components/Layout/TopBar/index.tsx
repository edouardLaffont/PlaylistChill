import React, { useEffect, useState } from 'react';

import SearchBar from '../../SearchBar';

import { setSearch } from '../../../slices/musicSlice'
import { useAppDispatch  } from '../../../store/store';
import ProfileButtonLogin from '../../ProfileLoginButton';

export default function TopBar() {
    const dispatch = useAppDispatch()
    

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        dispatch(setSearch(search))
    }

    return (
        <div className='flex bg-blue-dark-lighter h-16 w-full justify-between px-5 items-center'>
            <SearchBar placeholder='Search...' onChange={handleOnChange}/>
            <ProfileButtonLogin />
        </div>
    )
}
