import React from 'react';
import { Input as DefaultInput } from 'antd';
import { Form } from './form';

import './styles.scss';

export const Input = ({ name, label, setItemValue, itemValue }) => {
  return (
    <div className='input'>
      <Form name={name} label={label} />
      <DefaultInput
        onChange={(e) => setItemValue(e.target.value)}
        value={itemValue || ''}
      />
    </div>
  );
};
