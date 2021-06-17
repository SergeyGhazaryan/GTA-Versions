import React, { useState, useEffect } from 'react';
import { GtaVersion } from '../components/gtaVersions';
import axios from 'axios';
import { MAIN_URL } from '../constants/urls';

import './styles.scss';

const Layout = () => {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    getAllVersionsAsync();
  }, []);

  const getAllVersionsAsync = async () => {
    try {
      const result = await axios.get(MAIN_URL);
      const data = result.data;
      setVersions(data);
    } catch (error) {
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
