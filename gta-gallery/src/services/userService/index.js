import axios from '../instance';

const baseUrl = 'user';

export const createUser = async (username, password) => {
  try {
    await axios.post(baseUrl, {
      username,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};
