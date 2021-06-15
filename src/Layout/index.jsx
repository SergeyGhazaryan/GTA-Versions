import React from 'react';
import { data } from '../data';
import { GtaVersions } from '../components/gtaVersions';

import './styles.scss';

const Layout = () => {
  return (
    <>
      <div className='header'>GTA Versions</div>
      <div className='gta-version'>
        <div className='version-component'>
          {data.map((v, i) => (
            <GtaVersions
              imageLink={v.imageLink}
              versionName={v.versionName}
              id={i + 1}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Layout;
