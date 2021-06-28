import React from 'react';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const PopConfirm = ({ title, onConfirm, text, iconColor = 'red' }) => {
  return (
    <Popconfirm
      title={title}
      icon={<QuestionCircleOutlined style={{ color: `${iconColor}` }} />}
      onConfirm={onConfirm}
    >
      <a className='delete'>{text}</a>
    </Popconfirm>
  );
};
