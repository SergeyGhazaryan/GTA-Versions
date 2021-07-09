import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Upload } from 'antd';
import { VersionModal } from '../shared/versionModal';
import { Button } from '../button';
import { getVersion, updateVersion } from '../../services/gtaVersionsService';

import './styles.scss';

const getFileList = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const GTAVersionDetails = () => {
  const { id } = useParams();

  const [form] = Form.useForm();
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [imageValue, setImageValue] = useState({
    loading: false,
  });
  const [nameValue, setNameValue] = useState('');
  const [informationValue, setInformationValue] = useState('');
  const [version, setVersion] = useState({
    image: '',
    name: '',
    information: '',
  });

  const getData = async () => {
    const data = await getVersion(id);
    if (!data) return;
    setVersion({
      image: data.image,
      name: data.name,
      information: data.information,
    });
    setImageValue({ imageUrl: data.image });
    setNameValue(data.name);
    setInformationValue(data.information);
    form.resetFields();
  };

  const closeUpdateModal = () => {
    setUpdateModalVisible(!updateModalVisible);
  };

  const handleUpdate = async () => {
    setVersion({
      image: imageUrl,
      name: nameValue,
      information: informationValue,
    });
    await updateVersion(id, imageUrl, nameValue, informationValue);
    closeUpdateModal();
  };

  useEffect(() => {
    getData();
  }, []);

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

  const deleteImage = () => {
    setImageValue({ imageUrl: '' });
  };

  return (
    <div className='details-container'>
      <div>
        <div className='details-header'>
          <h1 className='version-name'>{version.name}</h1>
          <Button
            onClick={() => setUpdateModalVisible(true)}
            text='UPDATE VERSION'
          />
          {updateModalVisible && (
            <VersionModal
              isOpen={updateModalVisible}
              onCancel={closeUpdateModal}
              handleSave={handleUpdate}
              headerText='Update version'
            >
              <div className='form'>
                {imageUrl && (
                  <span className='delete-image' onClick={deleteImage}>
                    X
                  </span>
                )}
                <Form
                  form={form}
                  initialValues={{
                    name: nameValue,
                    information: informationValue,
                  }}
                >
                  <Form.Item
                    name='image'
                    label='Image'
                    valuePropName='fileList'
                    getValueFromEvent={getFileList}
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
                  <Form.Item label='Name' name='name'>
                    <Input
                      type='text'
                      onChange={(e) => setNameValue(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label='Information' name='information'>
                    <Input
                      type='text'
                      onChange={(e) => setInformationValue(e.target.value)}
                    />
                  </Form.Item>
                </Form>
              </div>
            </VersionModal>
          )}
        </div>
        {version.image && <img src={version.image} className='image' />}
        <div>{version.information}</div>
      </div>
    </div>
  );
};
