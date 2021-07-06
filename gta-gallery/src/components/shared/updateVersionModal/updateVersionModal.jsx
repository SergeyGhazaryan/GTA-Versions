import React from 'react';
import { Modal } from '../../modal';
import { InputFields } from '../../inputFields';

export const UpdateVersionModal = ({
  isOpen,
  onCancel,
  handleUpdate,
  warning,
  inputFields,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      onOk={handleUpdate}
      header='Update version'
      warning={warning}
    >
      <InputFields fieldsArray={inputFields} />
    </Modal>
  );
};
