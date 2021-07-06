import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVersion, updateVersion } from '../../services/gtaVersionsService';
import { UpdateVersionModal } from '../shared/updateVersionModal/updateVersionModal';
import { Button } from '../button';

import './styles.scss';

export const GTAVersionDetails = () => {
  const { id } = useParams();

  const [gtaVersionDetails, setGTAVersionDetails] = useState({});
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [imageValue, setImageValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [informationValue, setInformationValue] = useState('');
  const [warning, setWarning] = useState(false);

  const clearState = () => {
    setImageValue('');
    setNameValue('');
    setInformationValue('');
    setWarning(false);
  };

  const getData = async () => {
    const data = await getVersion(id);
    setGTAVersionDetails(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const onFileSelect = (filesArray) => {
    const file = filesArray[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageValue(reader.result);
    };
  };

  const inputFields = [
    {
      name: 'image',
      label: 'Image',
      onChange: onFileSelect,
      itemValue: imageValue,
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
    setUpdateModalVisible(!updateModalVisible);
    clearState();
  };

  const handleUpdate = async () => {
    if (id && imageValue && nameValue && informationValue) {
      const newVersions = {
        image: imageValue,
        name: nameValue,
        information: informationValue,
      };
      setGTAVersionDetails(newVersions);
      await updateVersion(id, imageValue, nameValue, informationValue);
      closeUpdateModal();
    } else {
      setWarning(true);
    }
  };

  return (
    <div className='details-container'>
      <div>
        <div className='details-header'>
          <h1 className='version-name'>{gtaVersionDetails.name}</h1>
          <Button
            onClick={() => setUpdateModalVisible(true)}
            text='UPDATE VERSION'
          />
          {updateModalVisible && (
            <UpdateVersionModal
              id={id}
              isOpen={updateModalVisible}
              onCancel={closeUpdateModal}
              handleUpdate={handleUpdate}
              warning={warning}
              inputFields={inputFields}
            />
          )}
        </div>
        <img src={gtaVersionDetails.image} className='image' />
        <div>{gtaVersionDetails.information}</div>
      </div>
    </div>
  );
};
