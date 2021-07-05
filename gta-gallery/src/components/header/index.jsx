import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { EditOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { getCurrentUser } from '../../services/userService';
import { isEmpty } from 'lodash';
import { logout } from '../../store/auth/actions';
import { getCurrentUser as defaultUser } from '../../store/auth/actions';

import './styles.scss';

export const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState({});

  let authenticated = useSelector((state) => state.auth.authenticated);

  const handleEditPage = () => {
    history.push('/me/edit');
  };

  const handleChangePassword = () => {
    history.push('/me/change/password');
  };

  const handleLogout = () => {
    localStorage.setItem('token', '');
    history.push('/login');
    dispatch(logout());
  };

  const getUser = async () => {
    const data = await getCurrentUser();
    if (data) {
      setCurrentUser(data);
      if (authenticated == null) {
        dispatch(defaultUser(authenticated));
      }
    }
  };

  const backToHome = () => {
    history.push('/');
  };

  const userInfo = useMemo(() => {
    if (isEmpty(currentUser)) return;
    return `${currentUser.firstName.charAt(0)} ${currentUser.lastName.charAt(
      0
    )}`;
  }, [currentUser]);

  useEffect(() => {
    getUser();
  }, [authenticated]);

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
      {authenticated !== false && (
        <Dropdown.Button
          overlay={menu}
          placement='bottomCenter'
          icon={userInfo}
        />
      )}
    </div>
  );
};
