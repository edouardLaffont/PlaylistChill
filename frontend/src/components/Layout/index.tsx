import React from 'react';
import Player from './Player';

import SideBar from './SideBar';
import TopBar from './TopBar';

export default function Layout() {
  return (
    <div className="w-full h-full">
      <div className='flex h-full'>
        <SideBar/>
        <TopBar/>
      </div>
      <Player/>
    </div>
  )
}
