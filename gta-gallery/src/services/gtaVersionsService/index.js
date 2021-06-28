import axios from '../instance';

const baseUrl = 'gta-versions';

export const getAllVersions = async () => {
  try {
    const result = await axios.get(baseUrl);
    const data = result.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getVersion = async (id) => {
  try {
    const result = await axios.get(`${baseUrl}/${id}`);
    const data = result.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createVersion = async (image, versionName, information) => {
  try {
    await axios.post(baseUrl, {
      image,
      versionName,
      information,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateVersion = async (id, image, versionName, information) => {
  try {
    await axios.put(`${baseUrl}/${id}`, {
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
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    console.log(error);
  }
};
