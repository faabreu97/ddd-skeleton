export class BackofficeUserResponse {
  id: string;
  name: string;
  email: string;

  constructor(data: { id: string; name: string; email: string }) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
  }
}
