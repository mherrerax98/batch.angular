import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProDespejeOrden } from '../types/despeje';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:7283';

@Injectable()
export class ProDespejeOrdenService {
  constructor(private httpClient: HttpClient) { }

  public createProDespejeOrden(proDespejeOrden: ProDespejeOrden): Observable<ProDespejeOrden> {
    return this.httpClient.post<ProDespejeOrden>(`${API_URL}/api/ProDespejeLineaOrden`, proDespejeOrden);
  }
}
