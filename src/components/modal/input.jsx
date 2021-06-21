import React from 'react';
import { Input as DefaultInput } from 'antd';
import { Item } from './item';

import './styles.scss';

export const Input = ({ name, label, setItemValue, itemValue, inputType }) => {
  return (
    <div className='input'>
      <Item name={name} label={label}>
        <DefaultInput
          type={inputType}
          onChange={(e) => setItemValue(e.target.value)}
          value={itemValue || ''}
        />
      </Item>
    </div>
  );
};
