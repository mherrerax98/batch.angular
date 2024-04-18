import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DespejeLinea } from '../types/despeje';

const API_URL = 'https://localhost:7283';

@Injectable()
export class DespejeLineaService {
  constructor(private httpClient: HttpClient) { }

  public getDespejeLinea(tipo: string): Observable<DespejeLinea[]> {
    return this.httpClient.get<DespejeLinea[]>(`${API_URL}/api/DespejeLinea/${tipo}`);
  }

  public getDespejesLinea(): Observable<DespejeLinea[]> {
    return this.httpClient.get<DespejeLinea[]>(`${API_URL}/api/DespejeLinea`);
  }
}
