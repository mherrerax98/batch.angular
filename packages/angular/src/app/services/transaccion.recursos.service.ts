import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransaccionDetalle } from '../types/transaccion';
import { Observable } from 'rxjs';
import { Product } from '../types/producto';
import { API_URL } from './url';

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

  public postTransaccionRecurso(transaccion: TransaccionDetalle): Observable<TransaccionDetalle> {
    return this.httpClient.post<TransaccionDetalle>(`${API_URL}/api/TransaccionesRecurso`, transaccion);
  }

  public getProductos(idCompro: string, numero: number): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${API_URL}/api/TransaccionesRecurso/products?idCompro=${idCompro}&numero=${numero}`);
  }
}
