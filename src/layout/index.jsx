import React, { useState, useEffect } from 'react';
import { getAllVersions } from '../services';
import { Button } from '../components/modal/button';
import { AddVersionModal } from '../components/shared/addVersionModal/addVersionModal';
import { GtaVersion } from '../components/gtaVersion';

import './styles.scss';

const Layout = () => {
  const [versions, setVersions] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(async () => {
    const data = await getAllVersions();
    setVersions(data);
  }, []);

  const toggleAddDialog = () => {
    setAddModalVisible(!addModalVisible);
  };

  return (
    <>
      <div className='header'>GTA Versions</div>
      <div className='version-container'>
        <div className='add-button'>
          <Button
            onClick={() => setAddModalVisible(true)}
            variant='contained'
            text='ADD VERSION'
          />
          {addModalVisible && (
            <AddVersionModal
              isOpen={addModalVisible}
              onCancel={toggleAddDialog}
            />
          )}
        </div>
        <div className='gta-version'>
          {versions.map((v) => (
            <GtaVersion image={v.image} versionName={v.versionName} id={v.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Layout;
