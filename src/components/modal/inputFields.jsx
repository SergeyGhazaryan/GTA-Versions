import React from 'react';
import { Input } from './input';

export const InputFields = ({ fieldsArray }) => {
  return (
    <div>
      {(fieldsArray || []).map((v) => (
        <Input
          name={v.name}
          label={v.label}
          onChange={v.onChange}
          itemValue={v.itemValue}
          inputType={v.name == 'image' ? 'file' : 'text'}
        />
      ))}
    </div>
  );
};
