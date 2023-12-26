import { ACCESS_TOKEN_STORAGE_KEY } from '../utils/constants';

export default class LocalServices {
  static getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  };

  static setAccessToken = (accessToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  };

  static removeAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  };
}
