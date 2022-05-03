import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import arrow_down from '../../assets/icons/arrow_down_icon.svg'
import profile_icon from '../../assets/icons/profile_icon.png'

import { useAppDispatch, useAppSelector } from '../../store/store'
import { logout } from '../../slices/authSlice'

const ProfileButtonLogin = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(store => store.auth)

    const [isDisplay, setIsDisplay] = useState(false)

    const handleClick = () => {
        const dropdownList = document.getElementById('dropdown-list') as HTMLElement
        if (isDisplay) {
            dropdownList.style.opacity = '0'
            setIsDisplay(!isDisplay)
        } else {
            dropdownList.style.opacity = '1'
            setIsDisplay(!isDisplay)
        }

    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className='relative z-100'>
            <div className='flex cursor-pointer items-center' onClick={handleClick}>
                <img src={profile_icon} alt='profile icon' className='w-14 h-14' />
                <span className='text-white text-lg mx-3'>{user.username}</span>
                <img className={isDisplay ? 'w-4 h-4 rotate-180' : 'w-4 h-4'} src={arrow_down} alt="arrow down" />
            </div>
            <ul id="dropdown-list" className='absolute w-full bg-white opacity-0 -right-2 mt-2 rounded-md pb-1'>
                <li>
                    <Link
                        key="settings"
                        to="/signin"
                        id="profile"
                        onClick={handleClick}
                    >
                        <li className="p-2 text-sm cursor-pointer text-blue hover:bg-green-dark" onClick={handleLogout}>
                            Lougout
                        </li>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default ProfileButtonLogin

