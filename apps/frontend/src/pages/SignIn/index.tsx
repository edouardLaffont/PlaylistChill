import React, { useState } from 'react';

import Input from '../../components/Input';
import YellowButton from '../../components/YellowButton';

import { login } from '../../data/userApi'

import { useAppDispatch } from '../../store/store';
import { login as setlogged } from '../../slices/authSlice'

import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [user, setUser] = useState({
    username: "",
    submitted: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(user.username)
      .then(response => {
        dispatch(setlogged(response))
        navigate('/')
      })
  }

  return (
    <div className="flex h-full">
      <div className='mx-auto mt-36 w-1/4'>
        <h1 className='text-white text-5xl text-center mb-4'>Sign In</h1>
        <form className='bg-white-transparant-19 w-full p-10 rounded-xl space-y-6' onSubmit={handleSubmit}>
          <Input text='Username :' type='text' placeholder='Enter your username' name='username' onChange={handleChange} />
          <YellowButton text='Sign In' className='' />
        </form>
      </div>
    </div>
  );
}
