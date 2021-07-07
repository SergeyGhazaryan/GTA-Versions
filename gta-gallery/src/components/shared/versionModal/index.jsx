import React from 'react';
import { Modal } from '../../modal';
import { InputFields } from '../../inputFields';

export const VersionModal = ({
  isOpen,
  onCancel,
  handleSave,
  warning,
  headerText,
  inputFields,
  versionDetails = {},
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      onOk={handleSave}
      header={headerText}
      warning={warning}
    >
      <InputFields fieldsArray={inputFields} versionDetails={versionDetails} />
    </Modal>
  );
};
