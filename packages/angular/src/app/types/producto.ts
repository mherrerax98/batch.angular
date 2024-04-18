export type ProductoTerminado = {
  totalUnidadesAcondicionadas: number;
  tamanioMuestra: number;
  totalCajasCorrugadas: number;
  corrugadosRevisar: number;
  cantidadProductoRevisar: number;
  unidadesNoConfirmadas: number;
  defectoEncontrado: number | null;
  concepto: string;
  realizadoPor: string;
  observacion?: string | null;
};

export interface ProductDetails {
  idPrdPadre: string,
  cantidad: number,
  lote: string,
  fecExpira: Date,
  nombre: string
}

export interface Product {
  id: string;
  nombre: string;
}