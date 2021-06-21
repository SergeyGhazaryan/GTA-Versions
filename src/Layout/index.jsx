import React, { useState, useEffect } from 'react';
import { getAllVersions } from '../services';
import { Button } from '../components/modal/button';
import { AddVersionModal } from '../components/shared/addVersionModal/addVersionModal';
import { GtaVersion } from '../components/gtaVersion';

import './styles.scss';

const Layout = () => {
  const [versions, setVersions] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    getAllVersions().then((data) => {
      setVersions(data);
    });
  }, []);

  const closeDialog = () => {
    setAddModalVisible(false);
  };

  return (
    <>
      <div className='header'>GTA Versions</div>
      <div className='version-container'>
        <div className='add-button'>
          <Button
            onClick={() => setAddModalVisible(true)}
            variant='contained'
            text={'ADD VERSION'}
          />
          <AddVersionModal isOpen={addModalVisible} onCancel={closeDialog} />
        </div>
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
