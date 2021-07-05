import { LOGIN, LOGOUT } from './types';

const initialState = {
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
    default:
      return state;
  }
};
