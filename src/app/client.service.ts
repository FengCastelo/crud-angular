import { Injectable } from '@angular/core';
import { Client } from './cadastro/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  static REPO_CLIENTS = 'CLIENTS';

  constructor() {}

  save(client: Client) {
    const storage = this.getStorage();
    storage.push(client);

    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(storage));
  }

  searchClient(name: string): Client[] {
    return this.getStorage();
  }

  private getStorage(): Client[] {
    const clientRepository = localStorage.getItem(ClientService.REPO_CLIENTS);

    if (clientRepository) {
      const clients: Client[] = JSON.parse(clientRepository);
      return clients;
    }

    const clients: Client[] = [];
    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(clients));

    return clients;
  }
}
