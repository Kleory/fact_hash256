import axios from 'axios';

export const BASE_URL = 'https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json';

const API = axios.create({
  // baseURL: BASE_URL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
