import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { createVersion } from '../../services';

import './styles.scss';

export const AddVersionModal = ({ isOpen, onCancel }) => {
  const [imageLinkValue, setImageLinkValue] = useState('');
  const [versionNameValue, setVersionNameValue] = useState('');
  const [informationValue, setInformationValue] = useState('');
  const [warning, setWarning] = useState(false);

  const handleAdd = () => {
    if (imageLinkValue && versionNameValue && informationValue) {
      createVersion(imageLinkValue, versionNameValue, informationValue);
    } else {
      setWarning(true);
    }
  };

  return (
    <Modal visible={isOpen} onCancel={onCancel} onOk={handleAdd}>
      <div className='add-dialog'>
        <div>Add new version</div>
        <div className='add-header'>
          <div>
            <Form.Item
              name='imageLink'
              label='Image link'
              rules={[{ required: true }]}
            >
              <Input
                onChange={(e) => setImageLinkValue(e.target.value)}
                value={imageLinkValue || ''}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name='versionName'
              label='Version name'
              rules={[{ required: true }]}
            >
              <Input
                onChange={(e) => setVersionNameValue(e.target.value)}
                value={versionNameValue || ''}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name='information'
              label='Information'
              rules={[{ required: true }]}
            >
              <Input
                onChange={(e) => setInformationValue(e.target.value)}
                value={informationValue || ''}
              />
            </Form.Item>
          </div>
        </div>
      </div>
      {warning && (
        <div className='add-warning'>You must fill in all the fields</div>
      )}
    </Modal>
  );
};
