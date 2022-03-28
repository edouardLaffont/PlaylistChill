import React from 'react';
import { Link } from 'react-router-dom';

type props = {
  icon: string
  text: string
  to: string
}

export default function SideBarButton({ icon, text, to }: props) {
  return (
    <li>
      <Link to={to} className="flex items-center">
        <img src={icon} alt={icon} className="w-8 h-8" />
        <span className="text-white text-2xl ml-5">{text}</span>
      </Link>
    </li>
  )
}
