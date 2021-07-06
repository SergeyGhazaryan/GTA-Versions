import React from 'react';
import { NavLink } from 'react-router-dom';
import { PopConfirm } from '../popConfirm';

import './styles.scss';

export const GtaVersion = ({ id, image, name, onDelete }) => {
  return (
    <div className='container'>
      <div className='version-header'>
        <h1 className='name'>{name}</h1>
        <PopConfirm title='Are you sure？' onConfirm={onDelete} text='X' />
      </div>
      <NavLink to={`/gta/${id}`} className='nav-link'>
        <img src={image} className='image' />
      </NavLink>
    </div>
  );
};
