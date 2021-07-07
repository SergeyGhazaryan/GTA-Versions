import React from 'react';
import { Input as DefaultInput } from 'antd';
import { Item } from './item';

import './styles.scss';

export const Input = ({
  name,
  label,
  onChange,
  itemValue,
  inputType,
  versionDetails,
  isRequired = false,
  currentState = false,
}) => {
  const handleChange = (e) => {
    if (inputType === 'file') {
      return onChange(e.target.files);
    }
    return onChange(e.target.value);
  };

  const handleCurrentState = (name) => {
    switch (name) {
      case 'name':
        return versionDetails.name;
      case 'information':
        return versionDetails.information;
      default:
        return '';
    }
  };

  return (
    <div>
      <Item name={name} label={label} isRequired={isRequired}>
        <DefaultInput
          defaultValue={currentState ? handleCurrentState(name) : ''}
          type={inputType}
          onChange={handleChange}
          value={itemValue}
        />
      </Item>
    </div>
  );
};
