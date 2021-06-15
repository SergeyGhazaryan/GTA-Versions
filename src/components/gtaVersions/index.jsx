import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.css';

export const GtaVersions = ({ imageLink, versionName, id }) => {
  return (
    <div className='version-container'>
      <NavLink to={`/gta/${id}`} className='nav-link'>
        <h1 className='image-text'>{versionName}</h1>
        <img src={imageLink} className='image' />
      </NavLink>
    </div>
  );
};
