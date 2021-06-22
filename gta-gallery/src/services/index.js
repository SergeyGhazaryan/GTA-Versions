import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = url;

export * from './gtaVersionsService';
