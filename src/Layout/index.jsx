import React from 'react';
import { data } from '../data';
import { GtaVersions } from '../components/gtaVersions';

import './styles.css';

const Layout = () => {
  return (
    <>
      <div className='header'>GTA Versions</div>
      <div className='gta-version'>
        <div className='version-component'>
          {data.map((v) => (
            <GtaVersions
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
