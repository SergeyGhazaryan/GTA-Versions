import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { updateVersion } from '../../services';

import './styles.scss';

export const UpdateVersionModal = ({ id, isOpen, onCancel }) => {
  const [imageLinkValue, setImageLinkValue] = useState('');
  const [versionNameValue, setVersionNameValue] = useState('');
  const [informationValue, setInformationValue] = useState('');
  const [warning, setWarning] = useState(false);

  const handleUpdate = () => {
    if (id && imageLinkValue && versionNameValue && informationValue) {
      updateVersion(id, imageLinkValue, versionNameValue, informationValue);
    } else {
      setWarning(true);
    }
  };

  return (
    <Modal visible={isOpen} onCancel={onCancel} onOk={handleUpdate}>
      <div className='update-dialog'>
        <div>Update version</div>
        <div className='update-header'>
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
        <div className='update-warning'>You must fill in all the fields</div>
      )}
    </Modal>
  );
};
