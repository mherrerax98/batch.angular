import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { Orders } from '../types/orders';

const API_URL = 'https://localhost:7283';

@Injectable()
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  public getOrders(fechaInicial: Date, fechaFinal: Date, idPlanta: string): Observable<Orders[]> {
    const fecInit = new Date(fechaInicial.getFullYear(), fechaInicial.getMonth(), fechaInicial.getDay());
    const fecFinal = new Date(fechaFinal.getFullYear(), fechaFinal.getMonth(), fechaFinal.getDay());
    
    return this.httpClient.get<Orders[]>(
      `${API_URL}/api/Orders?fechaInicial=${fecInit.toISOString()}&fechaFinal=${fecFinal.toISOString()}&idPlanta=${idPlanta}`
    );
  }

  public get(fechaInicial: Date, fechaFinal: Date, idPlanta: string): Observable<Orders[]> {
    const fecInit = new Date(fechaInicial.getFullYear(), fechaInicial.getMonth(), fechaInicial.getDay());
    const fecFinal = new Date(fechaFinal.getFullYear(), fechaFinal.getMonth(), fechaFinal.getDay());
    
    return this.httpClient.get<Orders[]>(
      `${API_URL}/api/Orders/orders/${idPlanta}?fechaInicial=${fecInit.toISOString()}&fechaFinal=${fecFinal.toISOString()}`
    );
  }
}
