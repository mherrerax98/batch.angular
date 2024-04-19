export interface DespejeLinea {
    id: number,
    descripcion: string,
    descTipoDespeje: string,
    valorDefecto: string,
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