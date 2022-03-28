import React from 'react';

type props = {
  text: string
  className: string
}

export default function YellowSubmitButton({text, className}: props) {
  return (
    <div className="flex justify-center">
      <button type="submit" className={`bg-yellow rounded-xl max-w-max px-4 shadow-2xl ${className}`}>
        {text}
      </button>
    </div>
  )
}
