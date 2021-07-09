import React from 'react';
import { useHistory } from 'react-router';
import { PopConfirm } from '../popConfirm';

import './styles.scss';

export const GtaVersion = ({ id, index, image, name, onDelete }) => {
  const history = useHistory();
  const handleImageClick = () => {
    history.push(`/gta/${id}`);
  };

  return (
    <div className='container'>
      <div className='version-header'>
        <div className='distinctive'>{index}</div>
        <h1 className='name'>{name}</h1>
        <PopConfirm title='Are you sure？' onConfirm={onDelete} text='X' />
      </div>
      <img onClick={handleImageClick} src={image} className='image' />
    </div>
  );
};
