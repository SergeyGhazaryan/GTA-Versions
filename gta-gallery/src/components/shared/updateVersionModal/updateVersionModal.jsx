import React from 'react';
import { Modal } from '../../modal';
import { InputFields } from '../../inputFields';

export const UpdateVersionModal = ({
  isOpen,
  onCancel,
  onOk,
  warning,
  inputFields,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      onOk={onOk}
      header='Update version'
      warning={warning}
    >
      <InputFields fieldsArray={inputFields} />
    </Modal>
  );
};
