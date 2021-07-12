import { LOGIN, LOGOUT, SET_USER, GET_USER } from './types';

export const login = (token) => ({
  type: LOGIN,
  payload: token,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const getUser = (authenticated) => ({
  type: GET_USER,
  payload: authenticated,
});
