import React from 'react';
import { Outlet } from 'react-router-dom';
import Player from './Player';

import SideBar from './SideBar';
import TopBar from './TopBar';

export default function Layout() {
  return (
    <div className='relative flex h-full'>
      <SideBar />
      <div className='flex flex-col w-full'>
        <TopBar />
        <div className="h-full overflow-y-scroll">
          <Outlet />
        </div>
      </div>
      <Player />
    </div>  )
}
