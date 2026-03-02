import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipality, UF } from './brasilapi.models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseURL: string = 'https://brasilapi.com.br/api';

  constructor(private http: HttpClient) {}

  listUFs(): Observable<UF[]> {
    const path = '/ibge/uf/v1';
    return this.http.get<UF[]>(this.baseURL + path);
  }

  listMunicipality(uf: string) : Observable<Municipality[]> {
    const path = '/ibge/municipios/v1/' + uf;
    return this.http.get<Municipality[]>(this.baseURL + path);
  }
}
