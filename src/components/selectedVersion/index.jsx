import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SELECTED_VERSION_URL } from '../../constants/urls';

import './styles.scss';

export const SelectedVersion = () => {
  const { id } = useParams();

  const [selectedVersion, setSelectedVersion] = useState({});

  useEffect(() => {
    getVersionAsync();
  }, []);

  const getVersionAsync = async () => {
    try {
      const result = await axios.get(`${SELECTED_VERSION_URL}${id}`);
      const data = result.data;
      setSelectedVersion(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='general'>
      <div>
        <h1 className='version-name'>{selectedVersion.versionName}</h1>
        <img src={selectedVersion.imageLink} className='image' />
        <div>{selectedVersion.information}</div>
      </div>
    </div>
  );
};
