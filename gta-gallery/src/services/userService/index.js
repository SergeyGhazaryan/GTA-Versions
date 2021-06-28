import axios from '../instance';

const baseUrl = 'user';

export const createUser = async (username, password) => {
  try {
    await axios.post(baseUrl, {
      username: username,
      password: password,
    });
  } catch (error) {
    console.log(error);
  }
};
