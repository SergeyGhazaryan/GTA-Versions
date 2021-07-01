import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputFields } from '../inputFields';
import { Button } from '../button';
import { Warning } from '../warning';
import { login } from '../../services';
import { NavLink } from 'react-router-dom';

import './styles.scss';

export const Login = () => {
  const history = useHistory();

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [warning, setWarning] = useState(false);
  const [warningTextPart, setWarningTextPart] = useState('');

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
      setWarning(false);
      const token = await login(usernameValue, passwordValue);
      if (token) {
        localStorage.setItem('token', token);
        history.push('/');
      }
    } else {
      setWarning(true);
      if (!usernameValue && !passwordValue) {
        setWarningTextPart('username and password');
      } else if (!passwordValue) {
        setWarningTextPart('password');
      } else if (!usernameValue) {
        setWarningTextPart('username');
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
          <Button onClick={handleLogin} variant='contained' text='Login' />
        </div>
        <NavLink to='/signup'>
          <div className='signup-button'>
            <Button variant='contained' text='Signup' />
          </div>
        </NavLink>
        <div className='login-warning'>
          {warning && <Warning text={`Please write your ${warningTextPart}`} />}
        </div>
      </div>
    </div>
  );
};
