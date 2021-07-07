import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { InputFields } from '../inputFields';
import { Button } from '../button';
import { login as loginRequest } from '../../services';
import { login } from '../../store/auth/actions';

import './styles.scss';

export const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

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
  ];

  const handleLogin = async () => {
    if (usernameValue && passwordValue && usernameValue !== passwordValue) {
      const token = await loginRequest(usernameValue, passwordValue);
      if (token) {
        localStorage.setItem('token', token);
        dispatch(login(token));
        history.push('/');
      }
    }
  };

  return (
    <div className='login-container'>
      <div className='login'>
        <h3 className='login-header'>Please Login</h3>
        <div>
          <InputFields fieldsArray={inputFields} />
        </div>
        <div className='login-button'>
          <Button onClick={handleLogin} text='Login' />
        </div>
        <NavLink to='/signup'>
          <div className='signup-button'>
            <Button text='Signup' />
          </div>
        </NavLink>
      </div>
    </div>
  );
};
