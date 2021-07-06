import React, { useState, useEffect } from 'react';
import { getAllVersions, createVersion, deleteVersion } from '../services';
import { GtaVersion } from '../components/gtaVersion';
import { AddVersionModal } from '../components/shared/addVersionModal/addVersionModal';
import { Button } from '../components/button';

import './styles.scss';

const Layout = () => {
  const [versions, setVersions] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
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
      clearState();
      closeAddModal();
    } else {
      setWarning(true);
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
            <AddVersionModal
              isOpen={addModalVisible}
              onCancel={closeAddModal}
              onOk={handleAdd}
              warning={warning}
              inputFields={inputFields}
            />
          )}
        </div>
      </div>
      <div className='gta-version'>
        {(versions || []).map((v, i) => (
          <GtaVersion
            key={i}
            image={v.image}
            name={v.name}
            id={v.id}
            onDelete={() => handleDelete(v.id, i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Layout;
