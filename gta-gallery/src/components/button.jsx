import React from 'react';
import { Button as DefaultButton } from 'antd';

export const Button = ({ onClick, text, type }) => {
  return (
    <DefaultButton onClick={onClick} htmlType='submit' type={type}>
      {text}
    </DefaultButton>
  );
};
