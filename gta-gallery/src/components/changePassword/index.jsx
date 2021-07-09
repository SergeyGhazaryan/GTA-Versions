import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../button';
import { changePassword } from '../../services';
import { Form } from 'antd';
import { Input } from '../input';

import './styles.scss';

export const ChangePassword = () => {
  const history = useHistory();

  const [oldPasswordValue, setOldPasswordValue] = useState('');
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [repeatNewPasswordValue, setRepeatNewPasswordValue] = useState('');

  const handleChangePassword = async () => {
    if (
      oldPasswordValue &&
      newPasswordValue &&
      repeatNewPasswordValue &&
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
            <Input type='password' onChange={setOldPasswordValue} />
          </Form.Item>
          <Form.Item
            label='New password'
            name='newPassword'
            rules={[
              { required: true, message: 'Please input your new password!' },
            ]}
          >
            <Input type='password' onChange={setNewPasswordValue} />
          </Form.Item>
          <Form.Item
            label='Repeat new password'
            name='repeatNewPassword'
            rules={[
              {
                required: true,
                message: 'Please input your repeat new password!',
              },
            ]}
          >
            <Input type='password' onChange={setRepeatNewPasswordValue} />
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
