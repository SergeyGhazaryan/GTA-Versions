import React, { useState } from 'react';
import { createUser } from '../../../services/userService';
import { Modal } from '../../antdItems/modal';
import { InputFields } from '../../antdItems/inputFields';

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

  const toggleCreateModal = () => {
    onCancel();
  };

  const handleCreate = () => {
    if (usernameValue && passwordValue) {
      createUser(usernameValue, passwordValue);
      toggleCreateModal();
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
