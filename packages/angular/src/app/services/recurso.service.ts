import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recurso } from '../types/recurso';
import { API_URL } from './url';

@Injectable()
export class RecursoService {
  constructor(private httpClient: HttpClient) {}

  getRecursos(
    idCompro: string,
    numero: number,
    idOperacion: string,
    idProduc: string
  ): Observable<Recurso[]> {
    return this.httpClient.get<Recurso[]>(
      `${API_URL}/api/Recursos?idCompro=${idCompro}&numero=${numero}&idOperacion=${idOperacion}&idProduc=${idProduc}`
    );
  }
}
