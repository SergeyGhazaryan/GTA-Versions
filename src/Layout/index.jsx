import React, { useState, useEffect } from 'react';
import { GtaVersion } from '../components/gtaVersion';
import axios from 'axios';

import './styles.scss';

const url = process.env.REACT_APP_API_URL;

const Layout = () => {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    getAllVersionsAsync();
  }, []);

  const getAllVersionsAsync = async () => {
    try {
      const result = await axios.get(`${url}GTAVersions`);
      const data = result.data;
      setVersions(data);
    } catch (error) {
      console.log(url);
      console.log(error);
    }
  };

  return (
    <>
      <div className='header'>GTA Versions</div>
      <div className='version-container'>
        <div className='gta-version'>
          {versions.map((v) => (
            <GtaVersion
              imageLink={v.imageLink}
              versionName={v.versionName}
              id={v.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Layout;
