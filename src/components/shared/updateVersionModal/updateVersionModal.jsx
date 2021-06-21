import React, { useState } from 'react';
import { updateVersion } from '../../../services';
import { Modal } from '../../modal/modal';
import { InputFields } from '../../modal/inputs';

export const UpdateVersionModal = ({ id, isOpen, onCancel }) => {
  const [imageLinkValue, setImageLinkValue] = useState('');
  const [versionNameValue, setVersionNameValue] = useState('');
  const [informationValue, setInformationValue] = useState('');
  const [warning, setWarning] = useState(false);

  const inputFields = [
    {
      name: 'imageLink',
      label: 'Image link',
      setItemValue: setImageLinkValue,
      itemValue: imageLinkValue,
    },
    {
      name: 'versionName',
      label: 'Version name',
      setItemValue: setVersionNameValue,
      itemValue: versionNameValue,
    },
    {
      name: 'information',
      label: 'Information',
      setItemValue: setInformationValue,
      itemValue: informationValue,
    },
  ];

  const handleUpdate = () => {
    if (id && imageLinkValue && versionNameValue && informationValue) {
      updateVersion(id, imageLinkValue, versionNameValue, informationValue);
      onCancel();
    } else {
      setWarning(true);
    }
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
