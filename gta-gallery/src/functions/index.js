export const getInputType = (inputName) => {
  switch (inputName) {
    case 'image':
      return 'file';
    case 'password':
      return 'password';
    default:
      return 'text';
  }
};
