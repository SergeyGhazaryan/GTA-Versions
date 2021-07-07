import React from 'react';
import { Input } from './input';
import { getInputType } from '../functions/index';

export const InputFields = ({ fieldsArray, versionDetails = {} }) => {
  return (
    <div>
      {(fieldsArray || []).map((v, i) => (
        <Input
          key={i}
          name={v.name}
          label={v.label}
          onChange={v.onChange}
          itemValue={v.itemValue}
          currentState={true}
          versionDetails={versionDetails}
          inputType={getInputType(v.name)}
        />
      ))}
    </div>
  );
};
