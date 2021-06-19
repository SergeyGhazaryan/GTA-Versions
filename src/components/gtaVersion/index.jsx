import React from 'react';
import { NavLink } from 'react-router-dom';
import { deleteVersion } from '../../services';
import { PopConfirm } from '../modal/popConfirm';

import './styles.scss';

export const GtaVersion = ({ imageLink, versionName, id }) => {
  const onDelete = () => {
    if (!id) return;
    deleteVersion(id);
  };

  return (
    <div className='container'>
      <div className='version-header'>
        <h1 className='name'>{versionName}</h1>
        <PopConfirm title='Are you sure？' onConfirm={onDelete} text='X' />
      </div>
      <NavLink to={`/gta/${id}`} className='nav-link'>
        <img src={imageLink} className='image' />
      </NavLink>
    </div>
  );
};
