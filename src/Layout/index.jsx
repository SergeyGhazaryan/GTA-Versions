import React from 'react';
import { gtaData } from '../data/data';
import { GtaVersions } from '../components/gtaVersions/index';

import './styles.scss';

const Layout = () => {
  return (
    <>
      <div className='header'>GTA Versions</div>
      <div className='gta-version'>
        <div className='version-component'>
          {gtaData.map((v, i) => (
            <GtaVersions
              imageLink={v.imageLink}
              versionName={v.versionName}
              id={i}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Layout;
