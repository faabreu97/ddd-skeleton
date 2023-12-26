import { v4 as Uuid } from 'uuid';
import { ApiEndpoint } from '../utils/http_clients/api_config';
import AuthApiClient from '../utils/http_clients/auth_api_client';
import RestApiClient from '../utils/http_clients/rest_api_client';
import LocalServices from './local_services';

export class UserServices {
  async login(data: { email: string; password: string }) {
    const { email, password } = data;
    const response = await AuthApiClient.post(ApiEndpoint.login, {
      email,
      password
    });
    LocalServices.setAccessToken(response.data.access_token);
    return response.data;
  }

  async register(data: {
    email: string;
    password: string;
    name: string;
    role: string;
  }) {
    const { email, password, name, role } = data;
    const id = Uuid();
    const response = await RestApiClient.put(`${ApiEndpoint.register}/${id}`, {
      id,
      name,
      email,
      password,
      role
    });
    return response.data;
  }

  async getProfile() {
    const response = await RestApiClient.get(ApiEndpoint.getUser);
    return response.data;
  }

  async getUsers() {
    const response = await RestApiClient.get(ApiEndpoint.employees);
    return response.data;
  }

  async deleteUser(id: string) {
    const response = await RestApiClient.delete(
      ApiEndpoint.employees + `/${id}`
    );
    return response.data;
  }

  async signOut() {
    LocalServices.removeAccessToken();
  }
}
