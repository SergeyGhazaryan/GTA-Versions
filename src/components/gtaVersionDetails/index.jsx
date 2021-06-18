import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './styles.scss';

const url = process.env.REACT_APP_API_URL;

export const GTAVersionDetails = () => {
  const { id } = useParams();

  const [gtaVersionDetails, setGTAVersionDetails] = useState({});

  useEffect(() => {
    getVersionAsync();
  }, []);

  const getVersionAsync = async () => {
    try {
      const result = await axios.get(`${url}GTAVersions/${id}`);
      const data = result.data;
      setGTAVersionDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='general'>
      <div>
        <h1 className='version-name'>{gtaVersionDetails.versionName}</h1>
        <img src={gtaVersionDetails.imageLink} className='image' />
        <div>{gtaVersionDetails.information}</div>
      </div>
    </div>
  );
};
