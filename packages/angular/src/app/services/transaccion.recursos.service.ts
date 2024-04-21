import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActualizarRecurso, TransaccionDetalle } from '../types/transaccion';
import { Observable } from 'rxjs';
import { Product } from '../types/producto';
import { API_URL } from './url';
import { FechaHora } from '../types/fecha.hora';

@Injectable()
export class TransaccionRecursosService {  
  constructor(private httpClient: HttpClient) {}

  public getTransaccionRecursos(
    idCompro: string,
    idOperac: string,
    numero: number
  ): Observable<TransaccionDetalle[]> {
    return this.httpClient.get<TransaccionDetalle[]>(
      `${API_URL}/api/TransaccionesRecurso?idCompro=${idCompro}&idOperac=${idOperac}&numero=${numero}`
    );
  }

  public post(transacciones: TransaccionDetalle[]): Observable<TransaccionDetalle[]> {
    return this.httpClient.post<TransaccionDetalle[]>(`${API_URL}/api/TransaccionesRecurso/recursos`, transacciones);
  }

  public update(transacciones: TransaccionDetalle[]): Observable<TransaccionDetalle[]> {
    return this.httpClient.put<TransaccionDetalle[]>(`${API_URL}/api/TransaccionesRecurso/recursos`, transacciones);
  }

  public updateInicial(transacciones: ActualizarRecurso[]): Observable<ActualizarRecurso[]> {
    return this.httpClient.put<ActualizarRecurso[]>(`${API_URL}/api/TransaccionesRecurso/recursos`, transacciones);
  }

  public updateOne(idCompro: string, numero: number, idTransaccion: number, date: FechaHora): Observable<ActualizarRecurso>{
    return this.httpClient.put<ActualizarRecurso>(`${API_URL}/api/TransaccionesRecurso/${idCompro}/${numero}/${idTransaccion}`, date);
  }

  public updateFinal(transacciones: ActualizarRecurso[]): Observable<ActualizarRecurso[]> {
    return this.httpClient.put<ActualizarRecurso[]>(`${API_URL}/api/TransaccionesRecurso/recursos/final`, transacciones);
  }

  public getProductos(idCompro: string, numero: number): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${API_URL}/api/TransaccionesRecurso/products?idCompro=${idCompro}&numero=${numero}`);
  }
}
