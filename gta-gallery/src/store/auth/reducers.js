import { LOGIN, LOGOUT, SET_USER, GET_USER } from './types';

const initialState = {
  firstName: null,
  lastName: null,
  username: null,
  authenticated: null,
  token: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload,
        authenticated: !!action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        authenticated: false,
      };
    case SET_USER:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        username: action.payload.username,
      };
    case GET_USER:
      return {
        ...state,
        authenticated: action.payload == null ? true : false,
      };
    default:
      return state;
  }
};
