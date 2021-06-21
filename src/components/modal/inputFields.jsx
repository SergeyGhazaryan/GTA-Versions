import React from 'react';
import { Input } from './input';

export const InputFields = ({ fieldsArray }) => {
  return (
    <div>
      {(fieldsArray || []).map((v) => (
        <Input
          name={v.name}
          label={v.label}
          setItemValue={v.setItemValue}
          itemValue={v.itemValue}
          inputType={v.name == 'imageLink' ? 'file' : 'text'}
        />
      ))}
    </div>
  );
};
