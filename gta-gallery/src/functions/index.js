export const getInputType = (inputName) => {
  switch (inputName) {
    case 'image':
      return 'file';
    case 'password':
    case 'repeatPassword':
    case 'repeatNewPassword':
    case 'oldPassword':
    case 'newPassword':
      return 'password';
    default:
      return 'text';
  }
};
