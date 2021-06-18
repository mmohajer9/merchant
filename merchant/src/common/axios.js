import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token'));
const headers = {};

if (token && token.access) {
  headers.Authorization = `Bearer ${token?.access}`;
}

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: headers,
});

// instance.defaults.headers.common["Authorization"] = "AUTH TOKEN";

export default instance;
