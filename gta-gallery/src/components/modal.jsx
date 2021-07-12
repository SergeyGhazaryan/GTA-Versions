import React from 'react';
import { Modal as DefaultModal } from 'antd';

import './styles.scss';

export const Modal = ({ isOpen, onCancel, onOk, header, children }) => {
  return (
    <DefaultModal visible={isOpen} onCancel={onCancel} onOk={onOk}>
      <div className='title'>{header}</div>
      <div className='modal-children'>{children}</div>
    </DefaultModal>
  );
};
