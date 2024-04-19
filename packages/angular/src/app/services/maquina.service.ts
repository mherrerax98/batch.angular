import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maquina } from '../types/maquina';
import { API_URL } from './url';

@Injectable()
export class MaquinaService {

  constructor(private httpClient: HttpClient) { }

  getMaquinas(): Observable<Maquina[]> {
    return this.httpClient.get<Maquina[]>(`${API_URL}/api/Maquina`);
  }
}
