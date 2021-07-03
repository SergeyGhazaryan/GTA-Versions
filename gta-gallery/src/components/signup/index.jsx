import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputFields } from '../inputFields';
import { Button } from '../button';
import { signup } from '../../services';

import './styles.scss';

export const Signup = () => {
  const history = useHistory();

  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');

  const inputFields = [
    {
      name: 'firstName',
      label: 'First name',
      onChange: setFirstNameValue,
      itemValue: firstNameValue,
    },
    {
      name: 'lastName',
      label: 'Last name',
      onChange: setLastNameValue,
      itemValue: lastNameValue,
    },
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
      firstNameValue &&
      lastNameValue &&
      passwordValue === repeatPasswordValue &&
      usernameValue !== passwordValue
    ) {
      const token = await signup(
        firstNameValue,
        lastNameValue,
        usernameValue,
        passwordValue
      );
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
          <Button onClick={handleSignup} text='Signup' />
        </div>
      </div>
    </div>
  );
};
