import React from 'react';
import { Input } from './input';
import { getInputType } from '../../functions';

export const InputFields = ({ fieldsArray }) => {
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
