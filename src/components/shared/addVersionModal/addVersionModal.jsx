import React, { useState } from 'react';
import { createVersion } from '../../../services';
import { Modal } from '../../modal/modal';
import { Input } from '../../modal/input';

export const AddVersionModal = ({ isOpen, onCancel }) => {
  const [imageLinkValue, setImageLinkValue] = useState('');
  const [versionNameValue, setVersionNameValue] = useState('');
  const [informationValue, setInformationValue] = useState('');
  const [warning, setWarning] = useState(false);

  const handleAdd = () => {
    if (imageLinkValue && versionNameValue && informationValue) {
      createVersion(imageLinkValue, versionNameValue, informationValue);
      onCancel();
    } else {
      setWarning(true);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      onOk={handleAdd}
      header='Add new version'
      warning={warning}
    >
      <Input
        name='imageLink'
        label='Image link'
        setItemValue={setImageLinkValue}
        itemValue={imageLinkValue}
      />
      <Input
        name='versionName'
        label='Version name'
        setItemValue={setVersionNameValue}
        itemValue={versionNameValue}
      />
      <Input
        name='information'
        label='Information'
        setItemValue={setInformationValue}
        itemValue={informationValue}
      />
    </Modal>
  );
};
