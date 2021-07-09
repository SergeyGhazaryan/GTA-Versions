import React from 'react';
import { Input as DefaultInput } from 'antd';

export const Input = ({ type, onChange, defaultValue }) => {
  const onFileSelect = (filesArray) => {
    if (!filesArray) return;
    const file = filesArray[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      onChange(reader.result);
    };
  };

  return (
    <DefaultInput
      type={type}
      defaultValue={type === 'file' || !defaultValue ? '' : defaultValue}
      onChange={
        type == 'file'
          ? (e) => onFileSelect(e.target.files)
          : (e) => onChange(e.target.value)
      }
    />
  );
};
