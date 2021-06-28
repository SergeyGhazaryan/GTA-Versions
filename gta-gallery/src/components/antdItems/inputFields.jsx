import React from 'react';
import { Input } from './input';

export const InputFields = ({ fieldsArray }) => {
  const getInputType = (inputName) => {
    switch (inputName) {
      case 'image':
        return 'file';
      case 'password':
        return 'password';
      default:
        return 'text';
    }
  };

  return (
    <div>
      {(fieldsArray || []).map((v) => (
        <Input
          name={v.name}
          label={v.label}
          onChange={v.onChange}
          itemValue={v.itemValue}
          inputType={getInputType(v.name)}
        />
      ))}
    </div>
  );
};
