import axios from '../axiosInstance';

const apiUrl = 'gtaversions';

export const getAllVersions = async () => {
  try {
    const result = await axios.get(apiUrl);
    const data = result.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getVersion = async (id) => {
  try {
    const result = await axios.get(`${apiUrl}/${id}`);
    const data = result.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createVersion = async (image, versionName, information) => {
  try {
    var result = await axios.post(apiUrl, {
      image,
      versionName,
      information,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateVersion = async (id, image, versionName, information) => {
  try {
    await axios.put(`${apiUrl}/${id}`, {
      image,
      versionName,
      information,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteVersion = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    console.log(error);
  }
};
