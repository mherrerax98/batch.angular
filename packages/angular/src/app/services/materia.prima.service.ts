import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MateriaPrima } from '../types/materiaPrima';


const API_URL = 'https://localhost:7283';

@Injectable()
export class MateriaPrimaService {

  constructor(private httpClient: HttpClient) { }

  getMateriaPrima(idCompro: string, numero: number): Observable<MateriaPrima[]> {
    return this.httpClient.get<MateriaPrima[]>(`${API_URL}/api/MateriaPrima/${idCompro}/${numero}`);
  }
}
