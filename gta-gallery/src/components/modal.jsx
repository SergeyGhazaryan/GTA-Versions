import React, { useEffect } from 'react';
import { Modal as DefaultModal } from 'antd';

import './styles.scss';

export const Modal = ({
  isOpen,
  onCancel,
  onOk,
  header,
  imageValue,
  deleteImage,
  children,
}) => {
  return (
    <DefaultModal visible={isOpen} onCancel={onCancel} onOk={onOk}>
      <div className='title'>{header}</div>
      {imageValue && (
        <div className='image-container'>
          <img className='modal-image' src={imageValue} />
          <div className='delete-image' onClick={deleteImage}>
            x
          </div>
        </div>
      )}
      <div className='modal-children'>{children}</div>
    </DefaultModal>
  );
};
