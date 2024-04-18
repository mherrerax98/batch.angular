export interface DespejeLinea {
    id: number,
    descripcion: string,
    descTipoDespeje: string,
    valordefecto: string,
    idTipoDespeje: number
}

export interface ProDespejeOrden {
    idCompro: string;
    numero: number;
    idProDespejeLinea: number;
    idOperacion: string;
    idRealizadoPor: string;
    idVerificadoPor: string;
    valor: string;
    resultado: string;
    fecReg: Date;
    fecMod: Date;
  }