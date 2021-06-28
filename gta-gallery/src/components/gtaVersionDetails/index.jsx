import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVersion } from '../../services/gtaVersionsService';
import { UpdateVersionModal } from '../shared/updateVersionModal/updateVersionModal';
import { Button } from '../button';

import './styles.scss';

export const GTAVersionDetails = () => {
  const { id } = useParams();

  const [gtaVersionDetails, setGTAVersionDetails] = useState({});
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const toggleUpdateDialog = () => {
    setUpdateModalVisible(!updateModalVisible);
  };

  const getData = async () => {
    const data = await getVersion(id);
    setGTAVersionDetails(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='details-container'>
      <div>
        <div className='details-header'>
          <h1 className='version-name'>{gtaVersionDetails.versionName}</h1>
          <Button
            onClick={() => setUpdateModalVisible(true)}
            variant='contained'
            text='UPDATE VERSION'
          />
          {updateModalVisible && (
            <UpdateVersionModal
              id={id}
              isOpen={updateModalVisible}
              onCancel={toggleUpdateDialog}
            />
          )}
        </div>
        <img src={gtaVersionDetails.image} className='image' />
        <div>{gtaVersionDetails.information}</div>
      </div>
    </div>
  );
};
