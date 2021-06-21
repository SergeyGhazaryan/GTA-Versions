import React from 'react';
import { Modal as DefaultModal } from 'antd';

import './styles.scss';

export const Modal = ({
  isOpen,
  onCancel,
  onOk,
  header,
  warning,
  children,
}) => {
  return (
    <DefaultModal visible={isOpen} onCancel={onCancel} onOk={onOk}>
      <div className='title'>{header}</div>
      <div className='modal-header'></div>
      {isOpen && children}
      {warning && (
        <div className='modal-warning'>You must fill in all the fields</div>
      )}
    </DefaultModal>
  );
};
