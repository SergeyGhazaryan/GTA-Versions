import { LOGIN, SIGNUP, LOGOUT, GET_CURRENT_USER } from './types';

export const login = (token) => ({
  type: LOGIN,
  payload: token,
});

export const signup = (token) => ({
  type: SIGNUP,
  payload: token,
});

export const logout = () => ({
  type: LOGOUT,
});

export const getCurrentUser = (authenticated) => ({
  type: GET_CURRENT_USER,
  payload: authenticated,
});
