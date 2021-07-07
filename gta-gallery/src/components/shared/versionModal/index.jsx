import React from 'react';
import { Modal } from '../../modal';
import { InputFields } from '../../inputFields';

export const VersionModal = ({
  isOpen,
  onCancel,
  handleSave,
  headerText,
  inputFields,
  deleteImage,
  isRequired = false,
  versionDetails = {},
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      onOk={handleSave}
      imageValue={versionDetails.image}
      deleteImage={deleteImage}
      header={headerText}
    >
      <InputFields
        isRequired={isRequired}
        fieldsArray={inputFields}
        versionDetails={versionDetails}
      />
    </Modal>
  );
};
