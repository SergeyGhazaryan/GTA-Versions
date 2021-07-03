import React, { useState } from 'react';
import { editUser } from '../../services/userService';
import { useHistory } from 'react-router-dom';
import { InputFields } from '../inputFields';
import { Button } from '../button';
import { Header } from '../header';

import './styles.scss';

export const EditUser = () => {
  const history = useHistory();

  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');

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
  ];

  const handleEditUser = async () => {
    if (usernameValue && firstNameValue && lastNameValue) {
      await editUser(firstNameValue, lastNameValue, usernameValue);
      history.push('/');
    }
    return;
  };

  return (
    <>
      <Header />
      <div className='edit-user-container'>
        <div className='edit-user'>
          <h3 className='edit-user-header'>Edit User</h3>
          <div>
            <InputFields fieldsArray={inputFields} />
          </div>
          <div className='edit-user-button'>
            <Button onClick={handleEditUser} text='Edit user' />
          </div>
        </div>
      </div>
    </>
  );
};
