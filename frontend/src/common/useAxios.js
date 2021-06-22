import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useAxios = ({ baseURL = 'http://127.0.0.1:8000' }) => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [axiosInstance, setAxiosInstance] = useState(null);

  useEffect(() => {
    if (token.access && isAuthenticated) {
      const headers = { Authorization: `Bearer ${token.access}` };
      const instance = axios.create({
        baseURL: baseURL,
        headers: headers,
      });
      setAxiosInstance(instance);
    } else if (!isAuthenticated || !token.access) {
      const instance = axios.create({
        baseURL: baseURL,
      });
      setAxiosInstance(instance);
    }
  }, [isAuthenticated, token, baseURL]);

  return axiosInstance;
};

export default useAxios;
