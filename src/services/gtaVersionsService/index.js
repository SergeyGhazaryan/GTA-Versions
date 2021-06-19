import axios from 'axios';

export const getAllVersions = async () => {
  try {
    const result = await axios.get('GTAVersions');
    const data = result.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getVersion = async (id) => {
  try {
    const result = await axios.get(`GTAVersions/${id}`);
    const data = result.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createVersion = async (imageLink, versionName, information) => {
  try {
    const result = await axios.post('GTAVersions', {
      imageLink: imageLink,
      versionName: versionName,
      information: information,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateVersion = async (
  id,
  imageLink,
  versionName,
  information
) => {
  try {
    const result = await axios.put(`GTAVersions/${id}`, {
      imageLink: imageLink,
      versionName: versionName,
      information: information,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteVersion = async (id) => {
  try {
    const result = await axios.delete(`GTAVersions/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};
