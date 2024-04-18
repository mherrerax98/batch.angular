import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Planta } from '../types/planta';

const API_URL = 'https://localhost:7283';

@Injectable()
export class PlantaService {
  constructor(private httpClient: HttpClient) { }

  public getPlantas(): Observable<Planta[]> {
    return this.httpClient.get<Planta[]>(`${API_URL}/api/Planta`);
  }
}
