import React from 'react';
import { Form as DefaultForm } from 'antd';

export const Item = ({ name, label, children }) => {
  return (
    <DefaultForm.Item name={name} label={label}>
      {children}
    </DefaultForm.Item>
  );
};
