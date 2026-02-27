import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConsultaComponent } from './consulta/consulta.component';

export const routes: Routes = [
  { path: 'signup', component: CadastroComponent },
  { path: 'query', component: ConsultaComponent },
];
