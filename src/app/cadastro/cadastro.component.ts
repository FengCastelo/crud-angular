import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Client } from './client';
import { ClientService } from '../client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxMaskDirective
  ], providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent implements OnInit {
  client: Client = Client.newClient();
  updating: boolean = false;

  constructor(
    private service: ClientService,
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
    });
  }

  save() {
    if (!this.updating) {
      this.service.save(this.client);
      alert('User created Successfully!');
      this.client = Client.newClient();
    } else {
      this.service.update(this.client);
      alert('User Updated Successfully!');
      this.router.navigate(['/query']);
    }
  }
}
