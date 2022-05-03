import React from 'react';

import home_icon from '../../../assets/icons/home_icon.png'
import playlist_icon from '../../../assets/icons/playlist_icon.png'
import library_icon from '../../../assets/icons/library_icon.png'
import heart_icon from '../../../assets/icons/heart_icon.png'

import SideBarButton from '../SideBarButton';
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <div className="h-full max-w-max bg-gradient-to-b from-blue-dark-lighter to-blue-dark">
      <Link to='/'>
        <h1 className="font-logo text-4xl px-14 pt-5 text-white">MUSIC</h1>
      </Link>
      <ul className='space-y-8 ml-5 mt-14'>
        <SideBarButton icon={home_icon} text='Home' to='/' />
        <SideBarButton icon={library_icon} text='Suggestions' to='/suggestions' />
        <SideBarButton icon={heart_icon} text='Favorites' to='/favorites' />
      </ul>
    </div>
  )
}
