import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVersion } from '../../services/gtaVersionsService';
import { Button } from 'antd';
import { UpdateVersionModal } from '../../modals/updateVersionModal/updateVersionModal';

import './styles.scss';

export const GTAVersionDetails = () => {
  const { id } = useParams();

  const [gtaVersionDetails, setGTAVersionDetails] = useState({});
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const closeUpdateDialog = () => {
    setUpdateModalVisible(false);
  };

  useEffect(() => {
    getVersion(id).then((data) => {
      setGTAVersionDetails(data);
    });
  }, []);

  return (
    <div className='general'>
      <div>
        <div className='details-header'>
          <h1 className='version-name'>{gtaVersionDetails.versionName}</h1>
          <Button
            onClick={() => setUpdateModalVisible(true)}
            variant='contained'
          >
            UPDATE VERSION
          </Button>
          {updateModalVisible && (
            <UpdateVersionModal
              id={id}
              isOpen={updateModalVisible}
              onCancel={closeUpdateDialog}
            />
          )}
        </div>
        <img src={gtaVersionDetails.imageLink} className='image' />
        <div>{gtaVersionDetails.information}</div>
      </div>
    </div>
  );
};
