import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputFields } from '../inputFields';
import { Button } from '../button';
import { changePassword } from '../../services';

import './styles.scss';

export const ChangePassword = () => {
  const history = useHistory();

  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [oldPasswordValue, setOldPasswordValue] = useState('');
  const [repeatOldPasswordValue, setRepeatOldPasswordValue] = useState('');

  const inputFields = [
    {
      name: 'newPassword',
      label: 'New password',
      onChange: setNewPasswordValue,
      itemValue: newPasswordValue,
    },
    {
      name: 'oldPassword',
      label: 'Old password',
      onChange: setOldPasswordValue,
      itemValue: oldPasswordValue,
    },
    {
      name: 'repeatOldPassword',
      label: 'Repeat old password',
      onChange: setRepeatOldPasswordValue,
      itemValue: repeatOldPasswordValue,
    },
  ];

  const handleChangePassword = async () => {
    if (
      newPasswordValue &&
      oldPasswordValue &&
      repeatOldPasswordValue &&
      oldPasswordValue === repeatOldPasswordValue &&
      newPasswordValue !== oldPasswordValue
    ) {
      await changePassword(newPasswordValue, oldPasswordValue);
      history.push('/');
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
