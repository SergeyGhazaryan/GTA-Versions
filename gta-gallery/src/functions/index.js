export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) alert('You can only upload JPG/PNG file!');
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) alert('Image must smaller than 2MB!');
  return isJpgOrPng && isLt2M;
};

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const handleChange = (info, setItemValue) => {
  const file = info.file;
  if (file.status === 'uploading') {
    return setItemValue({ loading: true });
  }
  if (file.status === 'done') {
    getBase64(file.originFileObj, (imageUrl) =>
      setItemValue({
        imageUrl,
        loading: false,
      })
    );
  }
};
