import axios from 'axios';

export const getAllVersions = async () => {
  try {
    const result = await axios.get('gtaversions');
    const data = result.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getVersion = async (id) => {
  try {
    const result = await axios.get(`gtaversions/${id}`);
    const data = result.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createVersion = async (image, versionName, information) => {
  try {
    const result = await axios.post('gtaversions', {
      image: image,
      versionName: versionName,
      information: information,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateVersion = async (id, image, versionName, information) => {
  try {
    const result = await axios.put(`gtaversions/${id}`, {
      image: image,
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
    const result = await axios.delete(`gtaversions/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};
