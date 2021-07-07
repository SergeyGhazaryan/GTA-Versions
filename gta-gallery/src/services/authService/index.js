import axios from '../axiosInstance';

export const login = async (username, password) => {
  try {
    const result = await axios.post('auth/login', {
      username,
      password,
    });
    return result.data.token;
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (firstName, lastName, username, password) => {
  try {
    const result = await axios.post('auth/signup', {
      firstName,
      lastName,
      username,
      password,
    });
    return result.data.token;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (newPassword, oldPassword) => {
  try {
    const result = await axios.patch('auth/settings', {
      newPassword,
      oldPassword,
    });
    return result.status == '200';
  } catch (error) {
    console.log(error);
  }
};
