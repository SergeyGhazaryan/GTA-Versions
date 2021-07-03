import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { EditOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { getCurrentUser } from '../../services/userService';

import './styles.scss';

export const Header = () => {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({});

  const handleEditPage = () => {
    history.push('/me/edit');
  };

  const handleChangePassword = () => {
    history.push('/me/change/password');
  };

  const handleLogout = () => {
    localStorage.setItem('token', '');
    history.push('/login');
  };

  const getUser = async () => {
    const data = await getCurrentUser();
    setCurrentUser(data);
  };

  const backToHome = () => {
    history.push('/');
  };

  useEffect(() => {
    if (!currentUser) return;
    getUser();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key='1' onClick={handleEditPage} icon={<UserOutlined />}>
        Edit user
      </Menu.Item>
      <Menu.Item key='2' onClick={handleChangePassword} icon={<EditOutlined />}>
        Change password
      </Menu.Item>
      <Menu.Item key='3' onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='header'>
      <div className='header-title' onClick={() => backToHome()}>
        GTA Versions
      </div>
      <Dropdown.Button
        overlay={menu}
        placement='bottomCenter'
        icon={`${
          currentUser.firstName ? currentUser.firstName.charAt(0) : ''
        } ${currentUser.lastName ? currentUser.lastName.charAt(0) : ''}`}
      />
    </div>
  );
};
