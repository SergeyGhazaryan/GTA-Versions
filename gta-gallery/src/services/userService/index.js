import axios from '../axiosInstance';

export const editUser = async (firstName, lastName, username) => {
  try {
    const result = await axios.put('user/me/settings', {
      firstName,
      lastName,
      username,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const result = await axios.get('user/me');
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
