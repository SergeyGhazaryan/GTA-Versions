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
        <div className='dropdown-field'>Edit user</div>
      </Menu.Item>
      <Menu.Item key='2' onClick={handleChangePassword} icon={<EditOutlined />}>
        <div className='dropdown-field'>Change password</div>
      </Menu.Item>
      <Menu.Item key='3' onClick={handleLogout} icon={<LogoutOutlined />}>
        <div className='dropdown-field'>Logout</div>
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
