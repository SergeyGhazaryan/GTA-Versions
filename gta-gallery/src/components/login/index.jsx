import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input } from 'antd';
import { Button } from '../button';
import { login, setUser } from '../../store/auth/actions';
import { login as loginRequest } from '../../services';
import { getCurrentUser } from '../../services/userService';

import './styles.scss';

export const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleLogin = async () => {
    if (usernameValue && passwordValue && usernameValue !== passwordValue) {
      const token = await loginRequest(usernameValue, passwordValue);
      if (token) {
        localStorage.setItem('token', token);
        dispatch(login(token));
        const currentUser = await getCurrentUser();
        dispatch(setUser(currentUser));
        history.push('/');
      }
    }
  };

  const handleSignup = () => {
    history.push('/signup');
  };

  return (
    <div className='login-container'>
      <div className='login'>
        <h3 className='login-header'>Please Login</h3>
        <Form>
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              type='text'
              onChange={(e) => setUsernameValue(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              onChange={(e) => setPasswordValue(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <div className='submit-button'>
              <Button onClick={handleLogin} type='primary' text='Submit' />
            </div>
          </Form.Item>
        </Form>
        <div className='signup-button'>
          <Button onClick={handleSignup} type='primary' text='Signup' />
        </div>
      </div>
    </div>
  );
};
