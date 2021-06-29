import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputFields } from '../inputFields';
import { Button } from '../button';
import { signup } from '../../services';

import './styles.scss';

export const Signup = () => {
  const history = useHistory();

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');

  const inputFields = [
    {
      name: 'username',
      label: 'Username',
      onChange: setUsernameValue,
      itemValue: usernameValue,
    },
    {
      name: 'password',
      label: 'Password',
      onChange: setPasswordValue,
      itemValue: passwordValue,
    },
    {
      name: 'repeatPassword',
      label: 'Repeat password',
      onChange: setRepeatPasswordValue,
      itemValue: repeatPasswordValue,
    },
  ];

  const handleSignup = async () => {
    if (
      usernameValue &&
      passwordValue &&
      repeatPasswordValue &&
      passwordValue === repeatPasswordValue &&
      usernameValue !== passwordValue
    ) {
      const token = await signup(usernameValue, passwordValue);
      if (token) {
        localStorage.setItem('token', token);
        history.push('/');
      }
    }
    return;
  };

  return (
    <div className='signup-container'>
      <div className='signup'>
        <h3 className='signup-header'>Please Signup</h3>
        <div>
          <InputFields fieldsArray={inputFields} />
        </div>
        <div className='signup-button'>
          <Button onClick={handleSignup} variant='contained' text='Signup' />
        </div>
      </div>
    </div>
  );
};
