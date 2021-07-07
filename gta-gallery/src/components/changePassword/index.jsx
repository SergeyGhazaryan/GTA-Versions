import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputFields } from '../inputFields';
import { Button } from '../button';
import { changePassword } from '../../services';

import './styles.scss';

export const ChangePassword = () => {
  const history = useHistory();

  const [oldPasswordValue, setOldPasswordValue] = useState('');
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [repeatNewPasswordValue, setRepeatNewPasswordValue] = useState('');

  const inputFields = [
    {
      name: 'oldPassword',
      label: 'Old password',
      onChange: setOldPasswordValue,
      itemValue: oldPasswordValue,
    },
    {
      name: 'newPassword',
      label: 'New password',
      onChange: setNewPasswordValue,
      itemValue: newPasswordValue,
    },
    {
      name: 'repeatNewPassword',
      label: 'Repeat new password',
      onChange: setRepeatNewPasswordValue,
      itemValue: repeatNewPasswordValue,
    },
  ];

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
        <div>
          <InputFields fieldsArray={inputFields} />
        </div>
        <div className='password-button'>
          <Button onClick={handleChangePassword} text='Change password' />
        </div>
      </div>
    </div>
  );
};
