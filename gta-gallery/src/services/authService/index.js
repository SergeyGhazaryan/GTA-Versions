import axios from '../instance';

export const login = async (username, password) => {
  try {
    const result = await axios.post('auth/login', {
      username: username,
      password: password,
    });
    return result.data.token;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.post('auth/logout', {
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};