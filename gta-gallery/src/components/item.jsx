import React from 'react';
import { Form as DefaultForm } from 'antd';

export const Item = ({ name, label, isRequired = false, children }) => {
  return (
    <DefaultForm.Item
      name={name}
      label={label}
      rules={[{ required: isRequired }]}
    >
      {children}
    </DefaultForm.Item>
  );
};
