import React, { useEffect } from 'react';
import { Modal as DefaultModal } from 'antd';

import './styles.scss';

export const Modal = ({
  isOpen,
  onCancel,
  onOk,
  header,
  imageValue = '',
  children,
}) => {
  return (
    <DefaultModal visible={isOpen} onCancel={onCancel} onOk={onOk}>
      <div className='title'>{header}</div>
      {imageValue && <img className='modal-image' src={imageValue} />}
      <div className='modal-children'>{children}</div>
    </DefaultModal>
  );
};
