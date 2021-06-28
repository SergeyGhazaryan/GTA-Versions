import axios from '../axiosInstance';

const apiUrl = 'user';

export const createUser = async (username, password) => {
  try {
    await axios.post(apiUrl, {
      username,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};
