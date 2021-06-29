import React, { useState, useEffect } from 'react';
import { getAllVersions } from '../services';
import { Button } from '../components/button';
import { AddVersionModal } from '../components/shared/addVersionModal/addVersionModal';
import { CreateUserModal } from '../components/shared/createUserModal/createUserModal';
import { GtaVersion } from '../components/gtaVersion';
import { useHistory } from 'react-router-dom';

import './styles.scss';

const Layout = () => {
  const history = useHistory();

  const [versions, setVersions] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);

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

  const toggleCreateDialog = () => {
    setCreateModalVisible(!createModalVisible);
  };

  const handleLogout = async () => {
    localStorage.setItem('token', '');
    history.push('/login');
  };

  return (
    <>
      <div className='header'>GTA Versions</div>
      <div className='version-container'>
        <div className='button-container'>
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
          <div>
            <Button
              onClick={() => setCreateModalVisible(true)}
              variant='contained'
              text='CREATE USER'
            />
            {createModalVisible && (
              <CreateUserModal
                isOpen={createModalVisible}
                onCancel={toggleCreateDialog}
              />
            )}
          </div>
          <div>
            <Button onClick={handleLogout} variant='contained' text='Logout' />
          </div>
        </div>
        <div className='gta-version'>
          {(versions || []).map((v) => (
            <GtaVersion key={v.id} image={v.image} name={v.name} id={v.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Layout;
