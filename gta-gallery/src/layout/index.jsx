import React, { useState, useEffect } from 'react';
import { getAllVersions, createVersion, deleteVersion } from '../services';
import { GtaVersion } from '../components/gtaVersion';
import { VersionModal } from '../components/shared/versionModal';
import { Button } from '../components/button';

import './styles.scss';

const Layout = () => {
  const [versions, setVersions] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [imageValue, setImageValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [informationValue, setInformationValue] = useState('');

  const clearState = () => {
    setImageValue('');
    setNameValue('');
    setInformationValue('');
  };

  const getData = async () => {
    const data = await getAllVersions();
    setVersions(data);
  };

  useEffect(() => {
    if (!versions) return;
    getData();
  }, []);

  const onFileSelect = (filesArray) => {
    const file = filesArray[0];

    const reader = new FileReader();
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

  const closeAddModal = () => {
    setAddModalVisible(!addModalVisible);
    clearState();
  };

  const handleAdd = async () => {
    if (imageValue && nameValue && informationValue) {
      const newVersions = [...versions];
      const createdVersionId = await createVersion(
        imageValue,
        nameValue,
        informationValue
      );
      newVersions.push({
        id: createdVersionId,
        image: imageValue,
        name: nameValue,
      });
      setVersions(newVersions);
      closeAddModal();
    }
  };

  const handleDelete = async (id, index) => {
    if (!id) return;
    await deleteVersion(id);
    const versionsArray = [...versions];
    versionsArray.splice(index, 1);
    setVersions(versionsArray);
  };

  return (
    <div className='version-container'>
      <div className='button-container'>
        <div className='add-button'>
          <Button onClick={() => setAddModalVisible(true)} text='ADD VERSION' />
          {addModalVisible && (
            <VersionModal
              isOpen={addModalVisible}
              onCancel={closeAddModal}
              handleSave={handleAdd}
              headerText='Add version'
              inputFields={inputFields}
              isRequired={true}
            />
          )}
        </div>
      </div>
      <div className='gta-version'>
        {(versions || []).map((v, index) => (
          <GtaVersion
            key={index}
            id={v.id}
            index={index + 1}
            image={v.image}
            name={v.name}
            onDelete={() => handleDelete(v.id, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Layout;
