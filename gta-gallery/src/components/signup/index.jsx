import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input } from 'antd';
import { Button } from '../button';
import { signup } from '../../services';
import { login } from '../../store/auth/actions';
import { getCurrentUser } from '../../services/userService';
import { setUser } from '../../store/auth/actions';

import './styles.scss';

export const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');

  const handleSignup = async () => {
    if (
      passwordValue &&
      repeatPasswordValue &&
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
        dispatch(login(token));
        const currentUser = await getCurrentUser();
        dispatch(setUser(currentUser));
        history.push('/');
      }
    }
    return;
  };

  const handleBack = () => {
    history.push('/login');
  };

  return (
    <div className='signup-container'>
      <div className='signup'>
        <h3 className='signup-header'>Please Signup</h3>
        <Form>
          <Form.Item
            label='First name'
            name='firstName'
            rules={[
              { required: true, message: 'Please input your first name!' },
            ]}
          >
            <Input
              type='text'
              onChange={(e) => setFirstNameValue(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='Last name'
            name='lastName'
            rules={[
              { required: true, message: 'Please input your last name!' },
            ]}
          >
            <Input
              type='text'
              onChange={(e) => setLastNameValue(e.target.value)}
            />
          </Form.Item>
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
          <Form.Item
            label='Repeat password'
            name='repeatPassword'
            rules={[
              { required: true, message: 'Please input your password again!' },
            ]}
          >
            <Input.Password
              onChange={(e) => setRepeatPasswordValue(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <div className='submit-button'>
              <Button onClick={handleSignup} type='primary' text='Submit' />
            </div>
          </Form.Item>
        </Form>
        <div className='back-button'>
          <Button onClick={handleBack} text='Back' />
        </div>
      </div>
    </div>
  );
};
