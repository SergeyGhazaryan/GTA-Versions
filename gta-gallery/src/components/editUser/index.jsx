import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../button';
import { editUser, getCurrentUser } from '../../services/userService';
import { Form, Input } from 'antd';
import { setUser } from '../../store/auth/actions';
import { useDispatch } from 'react-redux';

import './styles.scss';

export const EditUser = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');

  const getData = async () => {
    const data = await getCurrentUser();
    if (!data) return;
    setFirstNameValue(data.firstName);
    setLastNameValue(data.lastName);
    setUsernameValue(data.username);
    form.resetFields();
  };

  const handleEditUser = async () => {
    await editUser(firstNameValue, lastNameValue, usernameValue);
    dispatch(
      setUser({
        firstName: firstNameValue,
        lastName: lastNameValue,
        username: usernameValue,
      })
    );
    history.push('/');
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='edit-user-container'>
      <div className='edit-user'>
        <h3 className='edit-user-header'>Edit User</h3>
        <Form
          form={form}
          initialValues={{
            firstName: firstNameValue,
            lastName: lastNameValue,
            username: usernameValue,
          }}
        >
          <Form.Item label='First name' name='firstName'>
            <Input
              type='text'
              onChange={(e) => setFirstNameValue(e.target.value)}
            />
          </Form.Item>
          <Form.Item label='Last name' name='lastName'>
            <Input
              type='text'
              onChange={(e) => setLastNameValue(e.target.value)}
            />
          </Form.Item>
          <Form.Item label='Username' name='username'>
            <Input
              type='text'
              onChange={(e) => setUsernameValue(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <div className='edit-user-button'>
              <Button
                onClick={handleEditUser}
                type='primary'
                text='Edit user'
              />
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
