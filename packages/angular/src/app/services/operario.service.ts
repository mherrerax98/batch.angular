import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operario } from '../types/operario';
import { API_URL } from './url';

@Injectable()
export class OperarioService {

  constructor(private httpClient: HttpClient) { }

  public getOperarios(): Observable<Operario[]> {
    return this.httpClient.get<Operario[]>(`${API_URL}/api/Operarios`);
  }
}
