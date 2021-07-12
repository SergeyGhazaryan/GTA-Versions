import React from 'react';
import { Modal } from '../../modal';

export const VersionModal = ({
  isOpen,
  onCancel,
  handleSave,
  headerText,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onCancel={onCancel}
      onOk={handleSave}
      header={headerText}
    >
      {children}
    </Modal>
  );
};
