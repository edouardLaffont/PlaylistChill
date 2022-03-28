import React from 'react';

import icon_search from '../../assets/icons/search_icon.png'

type props = {
  placeholder: string
}

export default function SearchBar({ placeholder }: props) {
  return (
    <div className='bg-white-transparant-26 flex h-8 items-center rounded-2xl px-3 ml-20'>
        <input type='text' placeholder={placeholder} className='bg-transparent mr-3 w-80 outline-none text-white'/>
        <button>
            <img src={icon_search} alt='search icon' className='w-6 h-6'/>
        </button>
    </div>
  )
}
