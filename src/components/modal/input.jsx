import React from 'react';
import { Input as DefaultInput } from 'antd';
import { Item } from './item';

import './styles.scss';

export const Input = ({ name, label, onChange, itemValue, inputType }) => {
  const handleChange = (e) => {
    if (inputType == 'file') {
      return onChange(e.target.files);
    }
    return onChange(e.target.value);
  };

  return (
    <div className='input'>
      <Item name={name} label={label}>
        <DefaultInput
          type={inputType}
          onChange={handleChange}
          value={itemValue}
        />
      </Item>
    </div>
  );
};
