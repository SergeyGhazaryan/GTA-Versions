import React from 'react';
import { Form as DefaultForm } from 'antd';

export const Form = ({ name, label, children }) => {
  return (
    <DefaultForm.Item name={name} label={label} rules={[{ required: true }]}>
      {children}
    </DefaultForm.Item>
  );
};
