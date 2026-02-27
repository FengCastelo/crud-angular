import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ClientService } from '../client.service';
import { Client } from '../cadastro/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss',
})
export class ConsultaComponent implements OnInit {
  nameSearch: string = '';
  clientsList: Client[] = [];
  tableColumns: string[] = [
    'id',
    'name',
    'cpf',
    'email',
    'birthDate',
    'actions',
  ];

  constructor(
    private service: ClientService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.clientsList = this.service.searchClient('');
  }

  search() {
    this.clientsList = this.service.searchClient(this.nameSearch);
  }

  prepareEdit(id: string) {
    this.router.navigate(['/signup'], { queryParams: { id: id } });
  }

  prepareDelete(client: Client) {
    client.deleting = true;
  }

  delete(client: Client) {
    this.service.delete(client);
    alert('Client Deleted.')
    this.clientsList = this.service.searchClient('');
  }
}
