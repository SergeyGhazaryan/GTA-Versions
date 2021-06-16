import React from 'react';
import { data } from '../data';
import { GtaVersion } from '../components/gtaVersions';

import './styles.scss';

const Layout = () => {
  return (
    <>
      <div className='header'>GTA Versions</div>
      <div className='version-container'>
        <div className='gta-version'>
          {data.map((v) => (
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
