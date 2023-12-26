import axios from 'axios';
import { BASE_URL } from './api_config';

const AuthApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default AuthApiClient;
