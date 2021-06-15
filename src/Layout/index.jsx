import React from 'react';
import { gtaModel } from '../constants/gtaModel';
import { GtaVersions } from '../Components';

import '../Styles/styles.css';

const Layout = () => {
  return (
    <>
      <div className='header'>GTA Versions</div>
      <div className='gtaVersion'>
        <div className='versionComponent'>
          {gtaModel.map((v, i) => (
            <GtaVersions
              imageLink={v.imageLink}
              versionName={v.versionName}
              index={i}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Layout;
