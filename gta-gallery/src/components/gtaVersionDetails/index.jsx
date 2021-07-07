import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VersionModal } from '../shared/versionModal';
import { Button } from '../button';
import { getVersion, updateVersion } from '../../services/gtaVersionsService';

import './styles.scss';

export const GTAVersionDetails = () => {
  const { id } = useParams();

  const [gtaVersionDetails, setGTAVersionDetails] = useState({});
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [imageValue, setImageValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [informationValue, setInformationValue] = useState('');

  const getData = async () => {
    const data = await getVersion(id);
    setImageValue(data.image);
    setNameValue(data.name);
    setInformationValue(data.information);
  };

  const onFileSelect = (filesArray) => {
    const file = filesArray[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageValue(reader.result);
    };
  };

  const closeUpdateModal = () => {
    setUpdateModalVisible(!updateModalVisible);
  };

  const handleUpdate = async () => {
    const newVersions = {
      image: imageValue,
      name: nameValue,
      information: informationValue,
    };
    setImageValue(newVersions.image);
    setNameValue(newVersions.name);
    setInformationValue(newVersions.information);
    await updateVersion(id, imageValue, nameValue, informationValue);
    closeUpdateModal();
  };

  useEffect(() => {
    getData();
  }, []);

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

  return (
    <div className='details-container'>
      <div>
        <div className='details-header'>
          <h1 className='version-name'>{nameValue}</h1>
          <Button
            onClick={() => setUpdateModalVisible(true)}
            text='UPDATE VERSION'
          />
          {updateModalVisible && (
            <VersionModal
              id={id}
              isOpen={updateModalVisible}
              onCancel={closeUpdateModal}
              handleSave={handleUpdate}
              headerText='Update version'
              inputFields={inputFields}
              versionDetails={{
                image: imageValue,
                name: nameValue,
                information: informationValue,
              }}
            />
          )}
        </div>
        <img src={imageValue} className='image' />
        <div>{informationValue}</div>
      </div>
    </div>
  );
};
