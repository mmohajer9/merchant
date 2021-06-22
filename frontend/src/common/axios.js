import axios from 'axios';

const getAxiosInstance = (baseURL = 'http://127.0.0.1:8000') => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token && token.access) {
    const headers = { Authorization: `Bearer ${token.access}` };
    const instance = axios.create({
      baseURL: baseURL,
      headers: headers,
    });
    return instance;
  } else {
    const instance = axios.create({
      baseURL: baseURL,
    });
    return instance;
  }
};

export default getAxiosInstance;
