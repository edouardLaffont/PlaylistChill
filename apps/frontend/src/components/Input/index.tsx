import React from 'react';

type props = {
    text: string,
    type: string,
    placeholder: string,
    name: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ text, type, placeholder, name, onChange }: props) {
  return (
    <div className="flex flex-col text-black">
        <span className='text-lg mb-1'>{text}</span>
        <input required type={type} placeholder={placeholder} name={name} className='rounded-3xl px-2 py-1 text-lg p' onChange={onChange}/>
    </div>
  );
}
