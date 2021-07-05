import { combineReducers, createStore } from 'redux';
import { authReducer } from './auth/reducers';

export const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
