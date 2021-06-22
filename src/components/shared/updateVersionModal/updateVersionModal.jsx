import React, { useState } from 'react';
import { updateVersion } from '../../../services';
import { Modal } from '../../modal/modal';
import { InputFields } from '../../modal/inputFields';

export const UpdateVersionModal = ({ id, isOpen, onCancel }) => {
  const [image, setImage] = useState('');
  const [versionNameValue, setVersionNameValue] = useState('');
  const [informationValue, setInformationValue] = useState('');
  const [warning, setWarning] = useState(false);

  const onFileSelect = (filesArray) => {
    const file = filesArray[0];

    var reader = new FileReader();
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

  const handleUpdate = () => {
    if (id && image && versionNameValue && informationValue) {
      updateVersion(id, image, versionNameValue, informationValue);
      onCancel();
    }
    setWarning(true);
  };

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
