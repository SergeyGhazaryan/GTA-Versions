import React, { useState } from 'react';
import { updateVersion } from '../../../services';
import { Modal } from '../../modal';
import { InputFields } from '../../inputFields';

export const UpdateVersionModal = ({ id, isOpen, onCancel }) => {
  const [image, setImage] = useState('');
  const [nameValue, setNameValue] = useState('');
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
      name: 'name',
      label: 'Name',
      onChange: setNameValue,
      itemValue: nameValue,
    },
    {
      name: 'information',
      label: 'Information',
      onChange: setInformationValue,
      itemValue: informationValue,
    },
  ];

  const closeUpdateModal = () => {
    onCancel();
  };

  const handleUpdate = () => {
    if (id && image && nameValue && informationValue) {
      updateVersion(id, image, nameValue, informationValue);
      closeUpdateModal();
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
