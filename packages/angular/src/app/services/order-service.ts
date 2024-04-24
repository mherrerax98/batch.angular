import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { Orders } from '../types/orders';
import { API_URL } from './url';

@Injectable()
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  public getOrders(fechaInicial: Date, fechaFinal: Date, idPlanta: string): Observable<Orders[]> {
    return this.httpClient.get<Orders[]>(
      `${API_URL}/api/Orders?fechaInicial=${fechaInicial.toISOString()}&fechaFinal=${fechaFinal.toISOString()}&idPlanta=${idPlanta}`
    );
  }

  public get(fechaInicial: Date, fechaFinal: Date, idPlanta: string): Observable<Orders[]> {
    
    return this.httpClient.get<Orders[]>(
      `${API_URL}/api/Orders/orders/${idPlanta}?fechaInicial=${fechaInicial.toISOString()}&fechaFinal=${fechaFinal.toISOString()}`
    );
  }
}
