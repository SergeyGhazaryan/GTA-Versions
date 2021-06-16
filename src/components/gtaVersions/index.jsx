import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

export const GtaVersion = ({ imageLink, versionName, id }) => {
  return (
    <div className='container'>
      <NavLink to={`/gta/${id}`} className='nav-link'>
        <h1 className='version-name'>{versionName}</h1>
        <img src={imageLink} className='image' />
      </NavLink>
    </div>
  );
};
