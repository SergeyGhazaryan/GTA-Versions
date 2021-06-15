import React from 'react';
import { NavLink } from 'react-router-dom';

import '../Styles/styles.css';

export const GtaVersions = ({ imageLink, versionName, index }) => {
  const GetLink = (index) => {
    return `/gta/${index}`;
  };

  return (
    <div className='versionContainer'>
      <NavLink to={GetLink(index)} className='navLink'>
        <h1 className='imageText'>{versionName}</h1>
        <img src={imageLink} className='image' />
      </NavLink>
    </div>
  );
};
