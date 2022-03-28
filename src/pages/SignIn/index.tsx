import React from 'react';

import Input from '../../components/Input';
import YellowButton from '../../components/YellowButton';

export default function SignIn() {
  return (
    <div className="flex h-full">
      <div className='mx-auto mt-36 w-1/4'>
        <h1 className='text-white text-5xl text-center mb-4'>Sign In</h1>
        <form className='bg-white-transparant-19 w-full p-10 rounded-xl space-y-6'>
          <Input text='Email :' type='email' placeholder='Enter your email' name='email' />
          <Input text='Password :' type='password' placeholder='Enter your password' name='password' />
          <YellowButton text='Sign In' className=''/>
        </form>
      </div>
    </div>
  );
}
