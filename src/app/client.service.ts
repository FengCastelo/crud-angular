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

  update(client: Client) {
    const storage = this.getStorage();
    storage.map((c) => {
      if (c.id === client.id) {
        Object.assign(c, client);
      }
    });
    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(storage));
  }

  delete(client: Client) {
    const storage = this.getStorage();

    const newList = storage.filter(c => c.id !== client.id);

    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(newList));
  }

  searchClient(nameSearch: string): Client[] {
    const clients = this.getStorage();

    if (!nameSearch || nameSearch == null) {
      return clients;
    }

    return clients.filter(
      (client) =>
        client.name?.toLowerCase().indexOf(nameSearch.toLowerCase()) !== -1,
    );
  }

  findClientById(id: string): Client | undefined {
    const clients = this.getStorage();

    return clients.find((client) => client.id === id);
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
