import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operacion } from '../types/operacion';

const API_URL = 'https://localhost:7283';

@Injectable()
export class OperacionService {
  constructor(private httpClient: HttpClient) { }

  public getOperacion(): Observable<Operacion[]> {
    return this.httpClient.get<Operacion[]>(`${API_URL}/api/Operaciones`);
  }

  public getOperacionRuta(idCompro: string, idPlanta: string, numero: number ): Observable<Operacion[]> {
    return this.httpClient.get<Operacion[]>(`${API_URL}/api/Operaciones/${idCompro}/${idPlanta}/${numero}`);
  }
}
