import React from 'react';
import { NavLink } from 'react-router-dom';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { deleteVersion } from '../../services';

import './styles.scss';

export const GtaVersion = ({ imageLink, versionName, id }) => {
  const onDelete = () => {
    if (id) {
      deleteVersion(id);
    }
  };

  return (
    <div className='container'>
      <div className='version-header'>
        <h1 className='name'>{versionName}</h1>
        <Popconfirm
          title='Are you sure？'
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={onDelete}
        >
          <a className='delete'>X</a>
        </Popconfirm>
      </div>
      <NavLink to={`/gta/${id}`} className='nav-link'>
        <img src={imageLink} className='image' />
      </NavLink>
    </div>
  );
};
