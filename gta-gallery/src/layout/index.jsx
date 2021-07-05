import React, { useState, useEffect } from 'react';
import { getAllVersions } from '../services';
import { Button } from '../components/button';
import { AddVersionModal } from '../components/shared/addVersionModal/addVersionModal';
import { GtaVersion } from '../components/gtaVersion';

import './styles.scss';

const Layout = () => {
  const [versions, setVersions] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const getData = async () => {
    const data = await getAllVersions();
    setVersions(data);
  };

  useEffect(() => {
    if (!versions) return;
    getData();
  }, []);

  const toggleAddDialog = () => {
    setAddModalVisible(!addModalVisible);
  };

  return (
    <div className='version-container'>
      <div className='button-container'>
        <div className='add-button'>
          <Button onClick={() => setAddModalVisible(true)} text='ADD VERSION' />
          {addModalVisible && (
            <AddVersionModal
              isOpen={addModalVisible}
              onCancel={toggleAddDialog}
            />
          )}
        </div>
      </div>
      <div className='gta-version'>
        {(versions || []).map((v) => (
          <GtaVersion key={v.id} image={v.image} name={v.name} id={v.id} />
        ))}
      </div>
    </div>
  );
};

export default Layout;
