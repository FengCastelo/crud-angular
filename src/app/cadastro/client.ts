import { v4 as uuid } from 'uuid';

export class Client {
  id?: string;
  name?: string;
  cpf?: string;
  email?: string;
  birthDate?: string;

  static newClient() {
    const client = new Client();
    client.id = uuid();
    return client;
  }
}
