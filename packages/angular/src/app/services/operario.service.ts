import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operario } from '../types/operario';

const API_URL = 'https://localhost:7283';

@Injectable()
export class OperarioService {

  constructor(private httpClient: HttpClient) { }

  public getOperarios(): Observable<Operario[]> {
    return this.httpClient.get<Operario[]>(`${API_URL}/api/Operarios`);
  }
}
