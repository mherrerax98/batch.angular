import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProDespejeOrden } from '../types/despeje';
import { Observable } from 'rxjs';
import { API_URL } from './url';
import { ItemDespeje } from '../types/itemDespeje';
import { Inspeccion } from '../types/inspeccion';

@Injectable()
export class ProDespejeOrdenService {
  constructor(private httpClient: HttpClient) {}

  public createProDespejeOrden(
    proDespejeOrden: ProDespejeOrden
  ): Observable<ProDespejeOrden> {
    return this.httpClient.post<ProDespejeOrden>(
      `${API_URL}/api/ProDespejeLineaOrden`,
      proDespejeOrden
    );
  }

  public get(
    compro: string,
    numero: number,
    operacion: string,
    tipo: number
  ): Observable<ItemDespeje[]> {
    return this.httpClient.get<ItemDespeje[]>(
      `${API_URL}/api/ProDespejeLineaOrden/idCompro/${compro}/numero/${numero}/operacion/${operacion}/tipo/${tipo}`
    );
  }

  public getInspeccion(compro: string, numero: number, operacion: string, tipo: number): Observable<Inspeccion> {
    return this.httpClient.get<Inspeccion>(`${API_URL}/api/ProDespejeLineaOrden/inspeccion/idCompro/${compro}/numero/${numero}/operacion/${operacion}/tipo/${tipo}`);
  }
}
