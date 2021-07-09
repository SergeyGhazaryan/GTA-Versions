import React, { useState, useEffect } from 'react';
import { Form, Upload, Input } from 'antd';
import { GtaVersion } from '../components/gtaVersion';
import { VersionModal } from '../components/shared/versionModal';
import { Button } from '../components/button';
import { getAllVersions, createVersion, deleteVersion } from '../services';

import './styles.scss';

const getValueFromEvent = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const Layout = () => {
  const [versions, setVersions] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [imageValue, setImageValue] = useState({
    loading: false,
  });
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

  const closeAddModal = () => {
    setAddModalVisible(!addModalVisible);
    clearState();
  };

  const handleAdd = async () => {
    if (imageUrl && nameValue && informationValue) {
      const newVersions = [...versions];
      const createdVersionId = await createVersion(
        imageUrl,
        nameValue,
        informationValue
      );
      newVersions.push({
        id: createdVersionId,
        image: imageUrl,
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

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setImageValue({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) =>
        setImageValue({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      console.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      <div className='ant-upload-text'>Upload image</div>
    </div>
  );
  const { imageUrl } = imageValue;

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
            >
              <Form>
                <Form.Item
                  name='image'
                  label='Image'
                  valuePropName='fileList'
                  getValueFromEvent={getValueFromEvent}
                  rules={[{ required: true }]}
                >
                  <Upload
                    name='image'
                    listType='picture-card'
                    className='avatar-uploader'
                    showUploadList={false}
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt='avatar'
                        style={{ width: '100%' }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
                <Form.Item
                  label='Name'
                  name='name'
                  rules={[
                    { required: true, message: 'Please input your name!' },
                  ]}
                >
                  <Input
                    type='text'
                    onChange={(e) => setNameValue(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label='Information'
                  name='information'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your information!',
                    },
                  ]}
                >
                  <Input
                    type='text'
                    onChange={(e) => setInformationValue(e.target.value)}
                  />
                </Form.Item>
              </Form>
            </VersionModal>
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
