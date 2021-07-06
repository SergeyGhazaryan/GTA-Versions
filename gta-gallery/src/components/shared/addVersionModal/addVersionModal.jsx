import React from 'react';
import { Modal } from '../../modal';
import { InputFields } from '../../inputFields';

export const AddVersionModal = ({
  isOpen,
  onCancel,
  handleAdd,
  warning,
  inputFields,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      onOk={handleAdd}
      header='Add new version'
      warning={warning}
    >
      <InputFields fieldsArray={inputFields} />
    </Modal>
  );
};
