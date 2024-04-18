import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maquina } from '../types/maquina';

const API_URL = 'https://localhost:7283';

@Injectable()
export class MaquinaService {

  constructor(private httpClient: HttpClient) { }

  getMaquinas(): Observable<Maquina[]> {
    return this.httpClient.get<Maquina[]>(`${API_URL}/api/Maquina`);
  }
}
