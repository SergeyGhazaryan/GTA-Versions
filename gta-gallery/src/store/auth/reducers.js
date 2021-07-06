import { LOGIN, SIGNUP, LOGOUT, GET_CURRENT_USER } from './types';

const initialState = {
  authenticated: null,
  token: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case SIGNUP:
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
    case GET_CURRENT_USER:
      return {
        ...state,
        authenticated: action.payload == null ? true : false,
      };
    default:
      return state;
  }
};
