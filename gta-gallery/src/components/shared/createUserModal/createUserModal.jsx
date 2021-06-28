import React, { useState } from 'react';
import { createUser } from '../../../services/userService';
import { Modal } from '../../modal';
import { InputFields } from '../../inputFields';

export const CreateUserModal = ({ isOpen, onCancel }) => {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [warning, setWarning] = useState(false);

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

  const closeCreateModal = () => {
    onCancel();
  };

  const handleCreate = () => {
    if (usernameValue && passwordValue) {
      createUser(usernameValue, passwordValue);
      closeCreateModal();
    }
    setWarning(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      onOk={handleCreate}
      header='Create user'
      warning={warning}
    >
      <InputFields fieldsArray={inputFields} />
    </Modal>
  );
};
