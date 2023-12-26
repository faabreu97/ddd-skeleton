import axios, { InternalAxiosRequestConfig } from 'axios';
import LocalServices from '../../services/local_services';
import { BASE_URL } from './api_config';

const RestApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${LocalServices.getAccessToken()}`,
    'Content-Type': 'application/json'
  }
});

RestApiClient.interceptors.request.use(
  function (req: InternalAxiosRequestConfig<unknown>) {
    const token = LocalServices.getAccessToken();
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

RestApiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const status = error.response?.status;
    if (status === 401) {
      LocalServices.removeAccessToken();
    }
    return Promise.reject(error);
  }
);

export default RestApiClient;
