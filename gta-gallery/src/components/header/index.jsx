import React, { useMemo, useEffect } from 'react';
import { EditOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/auth/actions';
import { getUser as defaultUser, setUser } from '../../store/auth/actions';
import { getCurrentUser } from '../../services/userService';

import './styles.scss';

export const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const authenticated = useSelector((state) => state.auth.authenticated);
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);

  const handleEditPage = () => {
    history.push('/me/edit/user');
  };

  const handleChangePassword = () => {
    history.push('/me/edit/password');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
    dispatch(logout());
  };

  const getUser = async () => {
    const data = await getCurrentUser();
    if (data) {
      dispatch(setUser(data));
      if (authenticated == null) {
        dispatch(defaultUser(authenticated));
      }
    }
  };

  const backToHome = () => {
    history.push('/');
  };

  const userInitials = useMemo(() => {
    let result = '';
    if (firstName) {
      result += firstName.charAt(0) + ' ';
    }
    if (lastName) {
      result += lastName.charAt(0);
    }
    return result;
  }, [firstName, lastName]);

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
      <div className='header-title' onClick={backToHome}>
        GTA Versions
      </div>
      {authenticated && (
        <Dropdown.Button
          overlay={menu}
          placement='bottomCenter'
          icon={userInitials}
        />
      )}
    </div>
  );
};
