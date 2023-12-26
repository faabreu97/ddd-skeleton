export const BASE_URL = import.meta.env.PROD
  ? 'http://localhost:4000/api'
  : 'http://localhost:4000/api';

export class ApiEndpoint {
  //Auth Routes
  static login = '/employees/login';
  static register = '/employees/register';

  static employees = '/employees';
  static getUser = '/employees/me';
}

// export const getNetworkImage = (imagePath: string) => BASE_URL + imagePath;
