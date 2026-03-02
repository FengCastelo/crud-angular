import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UF } from './brasilapi.models';

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
}
