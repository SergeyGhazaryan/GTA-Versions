import React from 'react';
import { Button as DefaultButton } from 'antd';

export const Button = ({ onClick, variant, text }) => {
  return (
    <DefaultButton onClick={onClick} variant={variant}>
      {text}
    </DefaultButton>
  );
};
