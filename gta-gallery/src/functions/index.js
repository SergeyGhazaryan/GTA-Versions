export const getInputType = (inputName) => {
  switch (inputName) {
    case 'image':
      return 'file';
    case 'password':
    case 'repeatPassword':
      return 'password';
    default:
      return 'text';
  }
};
