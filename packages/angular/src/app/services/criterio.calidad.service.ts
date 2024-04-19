import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CriterioCalidad } from '../types/criterio.calidad';
import { API_URL } from './url';


@Injectable()
export class CriterioCalidadService {

  constructor(private httpClient: HttpClient) { }

  getCriterio(idComOrd: string, numeroOrd: number): Observable<CriterioCalidad[]> {
    return this.httpClient.get<CriterioCalidad[]>(`${API_URL}/api/CertificadoCalidad/${idComOrd}/${numeroOrd}`);
  }
}
