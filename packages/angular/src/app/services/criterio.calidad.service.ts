import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CriterioCalidad } from '../types/criterio.calidad';

const API_URL = 'https://localhost:7283';

@Injectable()
export class CriterioCalidadService {

  constructor(private httpClient: HttpClient) { }

  getCriterio(idComOrd: string, numeroOrd: number): Observable<CriterioCalidad[]> {
    return this.httpClient.get<CriterioCalidad[]>(`${API_URL}/api/CertificadoCalidad/${idComOrd}/${numeroOrd}`);
  }
}
