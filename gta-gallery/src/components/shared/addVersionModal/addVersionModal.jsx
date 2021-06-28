import React, { useState } from 'react';
import { createVersion } from '../../../services';
import { Modal } from '../../modal';
import { InputFields } from '../../inputFields';

export const AddVersionModal = ({ isOpen, onCancel }) => {
  const [image, setImage] = useState('');
  const [versionNameValue, setVersionNameValue] = useState('');
  const [informationValue, setInformationValue] = useState('');
  const [warning, setWarning] = useState(false);

  const onFileSelect = (filesArray) => {
    const file = filesArray[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const inputFields = [
    {
      name: 'image',
      label: 'Image',
      onChange: onFileSelect,
      itemValue: image,
    },
    {
      name: 'versionName',
      label: 'Version name',
      onChange: setVersionNameValue,
      itemValue: versionNameValue,
    },
    {
      name: 'information',
      label: 'Information',
      onChange: setInformationValue,
      itemValue: informationValue,
    },
  ];

  const closeAddModal = () => {
    onCancel();
  };

  const handleAdd = () => {
    if (image && versionNameValue && informationValue) {
      createVersion(image, versionNameValue, informationValue);
      closeAddModal();
    }
    setWarning(true);
  };

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
