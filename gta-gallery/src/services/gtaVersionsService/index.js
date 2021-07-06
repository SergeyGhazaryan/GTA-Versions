import axios from '../axiosInstance';

const apiUrl = 'gtaversions';

export const getAllVersions = async () => {
  try {
    const result = await axios.get(apiUrl);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getVersion = async (id) => {
  try {
    const result = await axios.get(`${apiUrl}/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const createVersion = async (image, name, information) => {
  try {
    const result = await axios.post(apiUrl, {
      image,
      name,
      information,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateVersion = async (id, image, name, information) => {
  try {
    const result = await axios.put(`${apiUrl}/${id}`, {
      image,
      name,
      information,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteVersion = async (id) => {
  try {
    const result = await axios.delete(`${apiUrl}/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
