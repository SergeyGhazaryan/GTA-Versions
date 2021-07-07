import React from 'react';
import { Button as DefaultButton } from 'antd';

export const Button = ({ onClick, text }) => {
  return <DefaultButton onClick={onClick}>{text}</DefaultButton>;
};
