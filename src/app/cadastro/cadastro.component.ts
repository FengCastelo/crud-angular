import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { Client } from './client';
import { ClientService } from '../client.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../http.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Municipality, UF } from '../brasilapi.models';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    NgxMaskDirective,
],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent implements OnInit {

  client: Client = Client.newClient();
  updating: boolean = false;
  private _snack: MatSnackBar = inject(MatSnackBar);
  states: UF[] = [];
  municipality: Municipality[] = [];

  constructor(
    private service: ClientService,
    private brasilApiService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id'];
      if (id) {
        let clientFound = this.service.findClientById(id);
        if (clientFound) {
          this.updating = true;
          this.client = clientFound;
        } else {
          this.client = Client.newClient();
        }
      }

      this.loadUFs();
    });
  }

  loadUFs() {
    // Observable / Subscribe
    this.brasilApiService.listUFs().subscribe({
      next: statesList => this.states = statesList,
      error: erro => console.log("Error: ", erro)
    });
  }

  save() {
    if (!this.updating) {
      this.service.save(this.client);
      this.openSnackBar('Created Successfully!');
      this.client = Client.newClient();
      this.router.navigate(['/query']);
    } else {
      this.service.update(this.client);
      this.openSnackBar('Updated Successfully!');
      this.router.navigate(['/query']);
    }
  }

  openSnackBar(message: string) {
    this._snack.open(message, 'OK');
  }
}
