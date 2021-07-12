import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input } from 'antd';
import { Button } from '../button';
import { changePassword } from '../../services';

import './styles.scss';

export const ChangePassword = () => {
  const history = useHistory();

  const [oldPasswordValue, setOldPasswordValue] = useState('');
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [repeatNewPasswordValue, setRepeatNewPasswordValue] = useState('');

  const handleChangePassword = async () => {
    if (
      newPasswordValue === repeatNewPasswordValue &&
      newPasswordValue !== oldPasswordValue
    ) {
      const success = await changePassword(newPasswordValue, oldPasswordValue);
      if (success) {
        history.push('/');
      }
    }
    return;
  };

  return (
    <div className='password-container'>
      <div className='password'>
        <h3 className='password-header'>Change Password</h3>
        <Form>
          <Form.Item
            label='Old password'
            name='oldPassword'
            rules={[
              { required: true, message: 'Please input your old password!' },
            ]}
          >
            <Input.Password
              onChange={(e) => setOldPasswordValue(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='New password'
            name='newPassword'
            rules={[
              { required: true, message: 'Please input your new password!' },
            ]}
          >
            <Input.Password
              onChange={(e) => setNewPasswordValue(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label='Repeat new password'
            name='repeatNewPassword'
            rules={[
              {
                required: true,
                message: 'Please input your new password again!',
              },
            ]}
          >
            <Input.Password
              onChange={(e) => setRepeatNewPasswordValue(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <div className='password-button'>
              <Button
                onClick={handleChangePassword}
                type='primary'
                text='Change password'
              />
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
